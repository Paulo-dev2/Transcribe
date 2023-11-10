const EventEmitter = require('events');

export class EventBus {
  public eventEmitter = new EventEmitter();

  public emitProgress(progress: any) {
    this.eventEmitter.emit('progress', progress);
  }

  public onProgress(callback: any) {
    this.eventEmitter.on('progress', callback);
  }
}

export default EventBus;
