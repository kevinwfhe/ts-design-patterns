import { Mediator } from "./mediator";

class Input {
  private mediator: Mediator;
  private text: string;
  constructor() {
    this.text = "";
  }
  setMediator(mediator: Mediator) {
    this.mediator = mediator;
  }
  type(content: string) {
    this.text = content;
    if (this.mediator) {
      if (content === "") {
        this.mediator.notify(this, "InputCleared");
        console.log("input is cleared");
      } else {
        this.mediator.notify(this, "InputTyped");
      }
    }
  }
  clear() {
    this.text = "";
    if (this.mediator) {
      this.mediator.notify(this, "InputCleared");
    }
    console.log("input is cleared");
  }
  validate() {
    console.log(`input validated ${/^[a-zA-Z0-9]*$/.test(this.text)}`);
  }
}

export { Input };
