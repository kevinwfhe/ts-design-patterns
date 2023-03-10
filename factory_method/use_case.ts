import {
  ButtonFactory,
  WebButtonFactory,
  MobileButtonFactory,
} from "./button_factory";
import { getOS } from "./util";

class App {
  private button: ButtonFactory;
  constructor() {
    const os = getOS() as "Web" | "Mobile"; // implemented in test case
    if (os === "Web") {
      this.button = new WebButtonFactory();
    } else if (os === "Mobile") {
      this.button = new MobileButtonFactory();
    }
  }
  render() {
    this.button.render();
  }
}

export { App };
