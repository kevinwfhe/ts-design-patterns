type Duck = {};

class Kitchen {
  constructor() {}
  airdry(duck: Duck) {
    console.log("Air-drying...");
    return duck;
  }
  stitch(duck: Duck) {
    console.log("Stitching...");
    return duck;
  }
}

class Sink {
  constructor() {}
  wash(duck: Duck) {
    console.log("Washing...");
    return duck;
  }
}

class Brush {
  constructor() {}
  season(duck: Duck) {
    console.log("Seasoning...");
    return duck;
  }
}

class Oven {
  constructor() {}
  roast(duck: Duck) {
    console.log("Roasting...");
    return duck;
  }
  preheat() {
    console.log("Preheating...");
  }
}

export { Duck, Kitchen, Sink, Brush, Oven };
