import {
  Button,
  Section,
  Modal,
  BaseTooltipComponent,
  Container,
} from "./tooltip_component";
import { getHoveredComponent, getIPBlackList } from "./utils";
import {
  TRequest,
  BaseRequestHandler,
  IPFilterHandler,
  AuthorizationHandler,
  CacheHandler,
  DBHandler,
  DB,
  TResponse,
} from "./request_handler";

type UI = {
  type: "Section" | "Modal" | "Button";
  children?: UI[];
  tooltip?: string;
};

class TooltipApp {
  // In this usecase, the event will be stopped by the first handler that
  // is able to handle it, and will not be passed to the next handler(s)
  ui: Container;
  constructor(ui: UI) {
    this.ui = new Section("Tooltips from App");
    this.ui.append(this.createUI(ui));
  }
  createUI(ui: UI) {
    const { type, children, tooltip } = ui;
    let node: BaseTooltipComponent | Container;

    if (type === "Section") {
      node = new Section(tooltip);
    } else if (type === "Modal") {
      node = new Modal(tooltip);
    } else {
      node = new Button(tooltip);
    }

    if (!(node instanceof Container) || !children) {
      return node;
    }

    for (const child of children) {
      node.append(this.createUI(child));
    }

    return node;
  }

  onHover() {
    const componentPath = getHoveredComponent() as number[];
    let component: Container | BaseTooltipComponent = this.ui;

    for (let part of componentPath) {
      if (component instanceof Container) {
        component = component.children[part];
      }
    }

    component.showTips();
  }
}

enum Config {
  "IPFilter",
  "Authorization",
  "Cache",
}

class ServerApp {
  // In this usecase, the request might be stopped by the first handler that
  // is able to reject it, or it might be passed to the next handler(s)
  handler: BaseRequestHandler;
  constructor(config: Config[], db: DB) {
    this.handler = new BaseRequestHandler();

    let h = this.handler;
    for (let cfg of config) {
      if (cfg === Config.IPFilter) {
        h.setNext(new IPFilterHandler(getIPBlackList()));
        h = h.next as IPFilterHandler;
      } else if (cfg === Config.Authorization) {
        h.setNext(new AuthorizationHandler());
        h = h.next as AuthorizationHandler;
      } else if (cfg === Config.Cache) {
        h.setNext(new CacheHandler());
        h = h.next as CacheHandler;
      }
    }

    if (db) {
      h.setNext(new DBHandler(db));
    }
  }
  
  listen(request: TRequest): TResponse {
    return this.handler.handle(request);
  }
}

export { TooltipApp, ServerApp, UI, Config };
