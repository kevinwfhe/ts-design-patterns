abstract class Button {
  abstract render: () => void;

  abstract onClick: () => void;
}

class WebButton implements Button {
  constructor() {
    console.log("WebButton created");
  }
  render = () => {
    console.log("Rendering WebButton");
  };
  onClick = () => {
    console.log("WebButton clicked");
  };
}

class MobileButton implements Button {

  constructor() {
    console.log("MobileButton created");
  }
  render = () => {
    console.log("Rendering MobileButton");
  };
  onClick = () => {
    console.log("MobileButton clicked");
  };
}

export { Button, WebButton, MobileButton };
