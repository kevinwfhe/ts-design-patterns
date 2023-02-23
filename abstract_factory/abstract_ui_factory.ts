import { Button, Input, Paragraph } from "./ui";
import { WebButton, WebInput, WebParagraph } from "./web_ui";
import { MobileButton, MobileInput, MobileParagraph } from "./mobile_ui";

abstract class UIFactory {
  abstract createButton: () => Button;
  abstract createInput: () => Input;
  abstract createParagraph: () => Paragraph;
}

class WebUIFactory implements UIFactory {
  createButton() {
    return new WebButton();
  }
  createInput() {
    return new WebInput();
  }
  createParagraph() {
    return new WebParagraph();
  }
}

class MobileUIFactory implements UIFactory {
  createButton() {
    return new MobileButton();
  }
  createInput() {
    return new MobileInput();
  }
  createParagraph() {
    return new MobileParagraph();
  }
}

export { UIFactory, WebUIFactory, MobileUIFactory };
