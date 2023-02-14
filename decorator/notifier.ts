interface Notifier {
  subjects?: string[];
  notify: (msg: string) => void;
}

class ConcreteNofifier implements Notifier {
  subjects: string[];
  constructor(subjects: string[]) {
    this.subjects = subjects;
  }
  notify(msg: string) {
    for (let subject of this.subjects) {
      console.log(`${subject} notified ${msg}`);
    }
  }
}

export { Notifier, ConcreteNofifier };
