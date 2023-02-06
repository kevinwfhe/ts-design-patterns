import { describe, test, expect } from "@jest/globals";
import { CloneSheep, Color, SheepShoes } from "./sheep";

describe("Prototype", () => {
  const dollySheep = new CloneSheep();
  dollySheep.name = "Dolly";
  dollySheep.color = new Color("White");
  dollySheep.shoes = new SheepShoes(dollySheep, new Color("Black"));
  test("Clone from prototype", () => {
    const dollyClone = dollySheep.clone();
    expect(dollyClone.name).toBe(dollySheep.name);
    expect(dollyClone.color !== dollySheep.color).toBeTruthy()
    expect(dollyClone.shoes !== dollySheep.shoes).toBeTruthy()
    expect(dollySheep.shoes.owner === dollySheep).toBeTruthy()
    expect(dollyClone.shoes.owner === dollyClone).toBeTruthy()
  });
});
