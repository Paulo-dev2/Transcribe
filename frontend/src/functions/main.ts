export const formateDataToSTR = (transcription: any) => {
    let srt = '';
    let index = 1;
        for (const timeRange in transcription) {
            if (transcription.hasOwnProperty(timeRange)) {
                const text = transcription[timeRange];

                srt += index + '\n';
                srt += timeRange.replace(/\./g, ',') + '\n'; // Substituir ponto por vírgula no tempo
                srt += text + '\n\n';

                index++;
            }
        }

    return srt
}

export const formatSRT = (srtData: any) => {
    const str: any = formateDataToSTR(srtData)
    const subtitles = [];
    const lines = str.split('\n');
  
    let subtitle: any = {};
    for (const line of lines) {
      // Remove espaços em branco extra
      const trimmedLine = line.trim();
  
      // Verifique se a linha é numérica, o que indica o número da legenda SRT
      if (!isNaN(trimmedLine)) {
        if (subtitle.startTime && subtitle.text) {
          subtitles.push(subtitle);
        }
        subtitle = {}; // Inicialize um novo objeto para a próxima legenda
      } else if (trimmedLine.includes('-->')) {
        // Se a linha contém '-->', então é uma linha de tempo
        const [startTime, endTime] = trimmedLine.split(' --> ');
        subtitle.startTime = parseSRTTime(startTime);
        subtitle.endTime = parseSRTTime(endTime);
      } else if (trimmedLine) {
        // Caso contrário, é o texto da legenda
        if (!subtitle.text) {
          subtitle.text = trimmedLine;
        } else {
          subtitle.text += ' ' + trimmedLine; // Para lidar com quebras de linha
        }
      }
    }
  
    if (subtitle.startTime && subtitle.text) {
      subtitles.push(subtitle); // Adicione a última legenda
    }
    return subtitles;
  };
  
const parseSRTTime = (timeStr: any) => {
    const timeParts = timeStr.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseFloat(timeParts[2].replace(',', '.')); // Substitui ',' por '.' para tratar decimais

    return hours * 3600 + minutes * 60 + seconds;
};


export const downloadTranscription = (transcription: any) => {
    const srt = formateDataToSTR(transcription);
    const blob = new Blob([srt], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'transcription.srt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

export const urlIsValid = (url: string) => {
    const tester = /^(https?|ftp):\/\/[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})?(\/[^\s]*)?$/
    return tester.test(url)
}