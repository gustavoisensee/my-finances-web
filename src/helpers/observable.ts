class Observable {
  private observers: ((data?: any) => void | unknown)[] = [];

  subscribe(func: (data?: any) => void | unknown): void {
    this.observers?.push?.(func);
  }

  unsubscribe(func: (data?: any) => void | unknown): void {
    this.observers = this.observers?.filter?.((observer) => observer !== func);
  }

  notify<T>(data?: T): void {
    this.observers?.forEach?.((observer) => observer(data));
  }
}

export default Observable;