import { Observer } from "./observer";

class Subject {
  private observers: Map<string, Observer[]>;

  constructor() {
    this.observers = new Map();
  }

  subscribe(eventType: string, observer: Observer) {
    const list = this.observers.get(eventType) || [];
    this.observers.set(eventType, [...list, observer]);
  }

  unsubscribe(eventType: string, observer: Observer) {
    const list = this.observers.get(eventType) || [];
    const index = list.indexOf(observer);
    if (index === -1) return;
    list.splice(index, 1);
    this.observers.set(eventType, list);
  }

  notify(eventType: string, data: any) {
    const list = this.observers.get(eventType) || [];
    for (let observer of list) {
      observer.update(data);
    }
  }
}

type SUBSRIPTION_TYPE = "ONSALE" | "SHIPPED" | "NEWARRIVAL";
class OnlineStore {
  private subsriptions: Subject;
  constructor() {
    this.subsriptions = new Subject();
  }
  productOnSale(product: string) {
    this.subsriptions.notify("ONSALE", { product });
  }
  productShipped(product: string) {
    this.subsriptions.notify("SHIPPED", { product });
  }
  newArrival(product: string) {
    this.subsriptions.notify("NEWARRIVAL", { product });
  }
  subscribe(eventType: SUBSRIPTION_TYPE, observer: Observer) {
    this.subsriptions.subscribe(eventType, observer);
  }
  unsubscribe(eventType: SUBSRIPTION_TYPE, observer: Observer) {
    this.subsriptions.unsubscribe(eventType, observer);
  }
}

export { Subject, OnlineStore };
