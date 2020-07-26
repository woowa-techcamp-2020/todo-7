export default class Event {
  constructor() {
    this.listeners = [];
  }

  addListener(listener) {
    if (Array.isArray(listener)) this.listeners = listener;
    else this.listeners.push(listener);
  }

  trigger(params) {
    this.listeners.forEach((listener) => listener(params));
  }
}
