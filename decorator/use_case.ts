import { Notifier, ConcreteNofifier } from "./notifier";
import {
  EmailNotifierDecorator,
  SMSNotifierDecorator,
  SlackNotifierDecorator,
} from "./notifier_decorators";

type Channel = "InApp" | "Email" | "SMS" | "Slack";

class App {
  scheduleNotifier: Notifier;
  constructor(config: Map<Channel, string[]>) {
    let notifier = new ConcreteNofifier(config.get("InApp") as string[]);
    if (config.has("Email")) {
      notifier = new EmailNotifierDecorator(
        notifier,
        config.get("Email") as string[]
      );
    }
    if (config.has("SMS")) {
      notifier = new SMSNotifierDecorator(
        notifier,
        config.get("SMS") as string[]
      );
    }
    if (config.has("Slack")) {
      notifier = new SlackNotifierDecorator(
        notifier,
        config.get("Slack") as string[]
      );
    }
    this.scheduleNotifier = notifier;
  }

  scheduleChanged(msg: string) {
    this.scheduleNotifier.notify(msg);
  }
}

export { App };
