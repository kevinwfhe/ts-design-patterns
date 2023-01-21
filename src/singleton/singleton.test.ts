import { describe, expect, test, jest } from "@jest/globals";
import { Database } from "./singleton";

describe("Singleton", () => {
  test("Create Database singleton and write '1'", () => {
    const db = Database.getInstance();
    db.write("1", true);

    expect(db.read("1")).toBeTruthy();
  });

  test("read '1' from singleton and write '2'", () => {
    const db = Database.getInstance();
    expect(db.read("1")).toBeTruthy();

    db.write("1", false);
    db.write("2", true);
  });

  test("read '1' and '2' from singleton", () => {
    const db = Database.getInstance();
    
    expect(db.read("1")).toBeFalsy();
    expect(db.read("2")).toBeTruthy();
  });
});
