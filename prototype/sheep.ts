abstract class Prototype {
  abstract clone: () => object;
}

class Color {
  public color: string;
  constructor(color: string) {
    this.color = color;
  }
}

// Used as a backreference in CloneSheep class
class SheepShoes {
  public owner: CloneSheep;
  public color: Color;
  constructor(owner: CloneSheep, color: Color) {
    this.owner = owner;
    this.color = color;
  }
}

class CloneSheep implements Prototype {
  public name: string; // primitive value
  public color: Color; // object
  public shoes: SheepShoes; // backreference
  clone() {
    const clone = Object.create(this);
    clone.color = Object.create(this.color);

    // Cloning an object that has a nested object with backreference
    // requires special treatment. After the cloning is completed, the
    // nested object should point to the cloned object, instead of the
    // original object. Spread operator can be handy for this case.
    clone.shoes = {
      ...this.shoes,
      owner: clone,
    };
    return clone;
  }
}

export { CloneSheep, Color, SheepShoes };
