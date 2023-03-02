abstract class OS {
  abstract login(): string;
  abstract isLoggedIn(): boolean;
  abstract sync(): string;
  abstract addPaymentMethod(): string;
  abstract hasPaymentMethod(): boolean;
  abstract download(): string;
}

abstract class BaseOS extends OS {
  protected loggedIn: boolean;
  protected paymentMethods: string[];
  constructor() {
    super();
    this.loggedIn = false;
    this.paymentMethods = [];
  }
  hasPaymentMethod(): boolean {
    return this.paymentMethods.length > 0;
  }
  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  abstract login(): string;
  abstract sync(): string;
  abstract addPaymentMethod(): string;
  abstract download(): string;
}

class iOS extends BaseOS {
  hasPaymentMethod(): boolean {
    return this.paymentMethods.length > 0;
  }
  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  login() {
    this.loggedIn = true;
    return "Log in with Apple ID";
  }
  sync() {
    return "Synced from iCloud";
  }
  addPaymentMethod() {
    this.paymentMethods.push("Apple Pay");
    return "Added Apple Pay";
  }
  download() {
    return "Download from App Store";
  }
}

class Android extends BaseOS {
  hasPaymentMethod(): boolean {
    return this.paymentMethods.length > 0;
  }
  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  login() {
    this.loggedIn = true;
    return "Log in with Google account";
  }
  sync() {
    return "Synced from Google Drive";
  }
  addPaymentMethod() {
    this.paymentMethods.push("Google Pay");
    return "Added Google Pay";
  }
  download() {
    return "Download from Google Play";
  }
}

export { OS, iOS, Android };
