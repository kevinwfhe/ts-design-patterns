interface TooltipComponent {
  showTips: () => void;
}

abstract class BaseTooltipComponent implements TooltipComponent {
  tooltipText?: string;
  protected container: Container;
  showTips() {
    if (this.tooltipText) {
      console.log(this.tooltipText);
      return;
    }
    if (this.container) {
      this.container.showTips();
    }
  }
  setContainer(container: Container) {
    this.container = container;
  }
}

abstract class Container extends BaseTooltipComponent {
  children: BaseTooltipComponent[] = [];
  append(child: BaseTooltipComponent | Container) {
    this.children.push(child);
    child.setContainer(this);
  }
}

class Button extends BaseTooltipComponent {
  constructor(tooltip?: string) {
    super();
    this.tooltipText = tooltip;
  }
}

class Modal extends Container {
  helpText?: string;
  constructor(tooltip?: string) {
    super();
    this.helpText = tooltip;
  }
  showTips(): void {
    if (this.helpText) {
      console.log(this.helpText);
      return;
    }
    if (this.container) {
      this.container.showTips();
    }
  }
}

class Section extends Container {
  constructor(tooltip?: string) {
    super();
    this.tooltipText = tooltip;
  }
  showTips() {
    if (this.tooltipText) {
      console.log(this.tooltipText);
      return;
    }
    if (this.container) {
      this.container.showTips();
    }
  }
}

export {
  TooltipComponent,
  BaseTooltipComponent,
  Container,
  Button,
  Modal,
  Section,
};
