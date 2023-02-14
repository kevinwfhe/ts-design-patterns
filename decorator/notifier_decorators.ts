import { Notifier } from "./notifier";

class NotifierBaseDecorator implements Notifier {
  notifier: Notifier;
  constructor(notifier: Notifier) {
    this.notifier = notifier;
  }
  notify(msg: string) {
    this.notifier.notify(msg);
  }
}

class EmailNotifierDecorator extends NotifierBaseDecorator {
  subjects: string[];
  constructor(notifier: Notifier, subjects: string[] = []) {
    super(notifier);
    this.subjects = subjects;
  }

  notify(msg: string) {
    super.notify(msg);
    for (let subject of this.subjects) {
      console.log(`${subject} notified by email ${msg}`);
    }
  }
}

class SMSNotifierDecorator extends NotifierBaseDecorator {
  subjects: string[];
  constructor(notifier: Notifier, subjects: string[] = []) {
    super(notifier);
    this.subjects = subjects;
  }

  notify(msg: string) {
    super.notify(msg);
    for (let subject of this.subjects) {
      console.log(`${subject} notified by SMS ${msg}`);
    }
  }
}

class SlackNotifierDecorator extends NotifierBaseDecorator {
  subjects: string[];
  constructor(notifier: Notifier, subjects: string[] = []) {
    super(notifier);
    this.subjects = subjects;
  }

  notify(msg: string) {
    super.notify(msg);
    for (let subject of this.subjects) {
      console.log(`${subject} notified by Slack ${msg}`);
    }
  }
}

export { EmailNotifierDecorator, SMSNotifierDecorator, SlackNotifierDecorator };
