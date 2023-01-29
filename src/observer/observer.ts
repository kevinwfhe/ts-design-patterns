abstract class Observer {
  abstract update: (data: any) => void;
}

class OnSaleObserver implements Observer {
  private client: string;
  constructor(name: string) {
    this.client = name;
  }
  update = (data: any) => {
    const { product } = data;
    console.log(`Hey ${this.client}, we've got ${product} on sale`);
  };
}

class NewArrivalObserver implements Observer {
  private client: string;
  constructor(name: string) {
    this.client = name;
  }
  update = (data: any) => {
    const { product } = data;
    console.log(`Hey ${this.client}, ${product} is now available`);
  };
}

class ShippingObserver implements Observer {
  private client: string;
  constructor(name: string) {
    this.client = name;
  }
  update = (data: any) => {
    const { product } = data;
    console.log(`Hey ${this.client}, your ${product} is out for delievery`);
  };
}

export { Observer, OnSaleObserver, NewArrivalObserver, ShippingObserver };
