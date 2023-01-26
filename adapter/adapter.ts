import { JsonPrinter } from "./json_printer";

abstract class PrintAdapter<T> {
  adaptee: JsonPrinter;
  abstract print: (content: T) => object;
}

class StringPrintAdapter implements PrintAdapter<string> {
  adaptee: JsonPrinter;
  constructor() {
    this.adaptee = new JsonPrinter();
  }
  print(content: string) {
    try {
      const json = JSON.parse(content);
      return this.adaptee.print(json);
    } catch (err) {
      return {
        error: "Failed to parse string to json"
      }
    }
  }
}

class NumberPrintAdapter implements PrintAdapter<number> {
  adaptee: JsonPrinter;
  constructor() {
    this.adaptee = new JsonPrinter();
  }
  // Here we define a way to parse a number to json format
  print(content: number) {
    const arr = String(content).split("");
    if (arr.length % 2 === 1) {
      arr.length -= 1;
    }
    const json = {};
    for (let i = 0; i < arr.length; i += 2) {
      json[arr[i]] = arr[i + 1];
    }
    return this.adaptee.print(json);
  }
}

export { PrintAdapter, StringPrintAdapter, NumberPrintAdapter };
