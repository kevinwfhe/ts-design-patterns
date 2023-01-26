import {
  PrintAdapter,
  StringPrintAdapter,
  NumberPrintAdapter,
} from "./adapter";

class App {
  private printer: PrintAdapter<any>;
  constructor() {}

  // In this case we use the adapters to print string and number to json object
  print(content: string | number) {
    if (typeof content === "string") {
      this.printer = new StringPrintAdapter();
      return this.printer.print(content);
    }
    if (typeof content === "number") {
      this.printer = new NumberPrintAdapter();
      return this.printer.print(content);
    }
  }
}

export { App };
