// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ObserverCallback = (data?: any) => void | unknown;

class Observable {
  private observers: ObserverCallback[] = [];

  subscribe(func: ObserverCallback): void {
    this.observers?.push?.(func);
  }

  unsubscribe(func: ObserverCallback): void {
    this.observers = this.observers?.filter?.((observer) => observer !== func);
  }

  notify<T>(data?: T): void {
    this.observers?.forEach?.((observer) => observer(data));
  }
}

export default Observable;