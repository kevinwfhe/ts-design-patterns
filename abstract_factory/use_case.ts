import { Button, Input, Paragraph } from "./ui";
import {
  UIFactory,
  WebUIFactory,
  MobileUIFactory,
} from "./abstract_ui_factory";
import { getOS } from "../factory_method/util";

class App {
  uiFactory: UIFactory;
  button: Button;
  input: Input;
  paragraph: Paragraph;

  // Here we use the abstract factory interface to create a set of
  // related ui components. The client code doesn't have to be aware of
  // the implementation details of different sets of component.
  constructor() {
    const os = getOS()
    if (os === "Web") {
      this.uiFactory = new WebUIFactory();
    }
    if (os === "Mobile") {
      this.uiFactory = new MobileUIFactory();
    }
    this.button = this.uiFactory.createButton();
    this.input = this.uiFactory.createInput();
    this.paragraph = this.uiFactory.createParagraph();
  }
  render() {
    this.button.render();
    this.input.render();
    this.paragraph.render();
  }
}

export { App };
