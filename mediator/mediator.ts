import { Button } from "./button";
import { Input } from "./input";

abstract class Mediator {
  abstract notify: (sender: object, event: string) => void;
}

class InputButtonMediator implements Mediator {
  input: Input;
  confirmButton: Button;
  clearButton: Button;
  constructor() {
    this.input = new Input();
    this.confirmButton = new Button("confirm", true);
    this.clearButton = new Button("clear", true);
    this.input.setMediator(this)
    this.confirmButton.setMediator(this);
    this.clearButton.setMediator(this);
  }

  // In this case we have an input box and two buttons,
  // these components should affect each others when 
  // specific events happen.

  // With the Mediator object, each component doesn't have to
  // know about the others, but they all communicate with each
  // others through the Mediator using a custom event protocol
  notify(sender: object, event: string) {
    if (event === "InputCleared") {
      // If input is cleared, both buttons should be disabled
      this.confirmButton.disable();
      this.clearButton.disable();
    } else if (event === "InputTyped") {
      // If input is not empty, both buttons should be enabled
      this.confirmButton.enabled();
      this.clearButton.enabled();
    } else if (event === "ButtonClicked") {
      if (sender === this.confirmButton) {
        // If confirm button is clicked, input should validate itself
        this.input.validate();
      } else if (sender === this.clearButton) {
        // If clear button is clicked, input should clear itself
        this.input.clear();
      }
    }
  }
}

export { Mediator, InputButtonMediator };
