import { Button, WebButton, MobileButton } from "./button";
abstract class ButtonFactory {
  constructor() {}
  abstract createButton: () => Button;
  render() {
    const button = this.createButton();
    button.render();
    button.onClick();
  }
}

class WebButtonFactory extends ButtonFactory {
  constructor() {
    super();
  }
  createButton = () => {
    return new WebButton();
  };
}

class MobileButtonFactory extends ButtonFactory {
  constructor() {
    super();
  }
  createButton = () => {
    return new MobileButton();
  };
}

export { ButtonFactory, WebButtonFactory, MobileButtonFactory };
