import { Button, Input, Paragraph } from "./ui";

class WebButton implements Button {
  render() {
    console.log("Web button rendered");
  }
  onClick: () => void;
}

class WebInput implements Input {
  render() {
    console.log("Web input rendered");
  }
  onChange: () => void;
}

class WebParagraph implements Paragraph {
  render() {
    console.log("Web paragraph rendered");
  }
}

export { WebButton, WebInput, WebParagraph };
