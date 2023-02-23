import { Button, Input, Paragraph } from "./ui";

class MobileButton implements Button {
  render() {
    console.log("Mobile button rendered");
  }
  onClick: () => void;
}

class MobileInput implements Input {
  render() {
    console.log("Mobile input rendered");
  }
  onChange: () => void;
}

class MobileParagraph implements Paragraph {
  render() {
    console.log("Mobile paragraph rendered");
  }
}

export { MobileButton, MobileInput, MobileParagraph };
