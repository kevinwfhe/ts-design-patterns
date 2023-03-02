import { OS, iOS, Android } from "./os";
import { getOS } from "../factory_method/util";

class JsBridge {
  // In this case we try to simulate a cross-platform mobile framework
  // which can support both iOS and Android devices
  os: OS;
  constructor() {
    const os = getOS();
    if (os === "iOS") {
      this.os = new iOS();
    }
    if (os === "Android") {
      this.os = new Android();
    }
  }
  cloudSync() {
    if (!this.os.isLoggedIn()) {
      this.os.login();
    }
    return this.os.sync();
  }
  downloadApp() {
    if (!this.os.isLoggedIn()) {
      this.os.login();
    }
    if (!this.os.hasPaymentMethod()) {
      this.os.addPaymentMethod();
    }
    return this.os.download();
  }
}

export { JsBridge };
