import { Button, WebButton, MobileButton } from "./button";
abstract class ButtonFactory {
  abstract createButton: () => Button;
  render() {
    const button = this.createButton();
    button.render();
    button.onClick();
  }
}

class WebButtonFactory extends ButtonFactory {
  createButton = () => {
    return new WebButton();
  };
}

class MobileButtonFactory extends ButtonFactory {
  createButton = () => {
    return new MobileButton();
  };
}

export { ButtonFactory, WebButtonFactory, MobileButtonFactory };
