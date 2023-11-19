const os = require('os');
const EventEmitter = require('events').EventEmitter;
const ffmpeg = require('fluent-ffmpeg');
const ytdl = require('./ytdl-core');
const async = require('async');
const progress = require('progress-stream');
const sanitize = require('sanitize-filename');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const fs = require('fs');
// Esta é uma biblioteca que eu baixei, pois estava dando erro nas versões, pois estava desatualizada.
// Este código é uma lib que é importada por outra classe para baixar os vídeos em mp3.

class YoutubeMp3Downloader extends EventEmitter {

  constructor(options) {
    super();
    this.youtubeBaseUrl = 'http://www.youtube.com/watch?v=';
    this.youtubeVideoQuality = (options && options.youtubeVideoQuality ? options.youtubeVideoQuality : 'highestaudio');
    this.outputPath = options && options.outputPath ? options.outputPath : os.homedir();
    this.queueParallelism = (options && options.queueParallelism ? options.queueParallelism : 1);
    this.progressTimeout = (options && options.progressTimeout ? options.progressTimeout : 1000);
    this.requestOptions = (options && options.requestOptions ? options.requestOptions : { maxRedirects: 5 });
    this.outputOptions = (options && options.outputOptions ? options.outputOptions : []);
    this.allowWebm = (options && options.allowWebm ? options.allowWebm : false);

    if (options && options.ffmpegPath) {
      ffmpeg.setFfmpegPath(options.ffmpegPath);
    }else{
      ffmpeg.setFfmpegPath(ffmpegPath);
    }


    this.setupQueue();
  }

  setupQueue() {
    let self = this;
    // Async download/transcode queue
    this.downloadQueue = async.queue(function (task, callback) {
      self.emit('queueSize', self.downloadQueue.running() + self.downloadQueue.length());

      self.performDownload(task, function(err, result) {
        callback(err, result);
      });
    }, self.queueParallelism);
  }

  download (videoId, fileName) {
    let self = this;
    const task = {
      videoId: videoId,
      fileName: fileName
    };

    this.downloadQueue.push(task, function (err, data) {
      self.emit('queueSize', self.downloadQueue.running() + self.downloadQueue.length());

      if (err) {
        self.emit('error', err, data);
      } else {
        self.emit('finished', err, data);
      }
    });
  };

  async performDownload(task, callback) {
    let self = this;
  let info;
  const videoUrl = this.youtubeBaseUrl + task.videoId;
  let resultObj = {
    videoId: task.videoId
  };

  try {
    info = await ytdl.getInfo(videoUrl, { quality: this.youtubeVideoQuality })
  } catch (err) {
    return callback(err);
  }

  const videoTitle = sanitize(info.videoDetails.title);
  let artist = 'Unknown';
  let title = 'Unknown';
  const thumbnail = info.videoDetails.thumbnails ?
    info.videoDetails.thumbnails[0].url
    : info.videoDetails.thumbnail || null;

  if (videoTitle.indexOf('-') > -1) {
    let temp = videoTitle.split('-');
    if (temp.length >= 2) {
      artist = temp[0].trim();
      title = temp[1].trim();
    }
  } else {
    title = videoTitle;
  }

  const audioStream = ytdl.downloadFromInfo(info, { quality: 'highestaudio' });
  const outputFilePath = task.fileName ? `${self.outputPath}/${sanitize(task.fileName)}.mp3` : `${self.outputPath}/${videoTitle || info.videoId}.mp3`;

  const fileWriteStream = fs.createWriteStream(outputFilePath);

  fileWriteStream.on('error', function (err) {
    callback(err, null);
  });

  fileWriteStream.on('finish', function () {
    resultObj.file = outputFilePath;
    resultObj.youtubeUrl = videoUrl;
    resultObj.videoTitle = videoTitle;
    resultObj.artist = artist;
    resultObj.title = title;
    resultObj.thumbnail = thumbnail;
    return callback(null, resultObj);
  });

  const str = progress({
    length: parseInt(info.videoDetails.lengthSeconds) * 1000000 // Length of the video in bytes
  });

  str.on('progress', function (progress) {
    self.emit('progress', { videoId: task.videoId, progress: progress })
  });

  audioStream.pipe(str).pipe(fileWriteStream);
  }
}

module.exports = YoutubeMp3Downloader;
