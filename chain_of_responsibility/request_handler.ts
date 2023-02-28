type TRequest = {
  ip: string;
  role: "Admin" | "User";
  query: string;
  expireCache?: boolean;
};

type TResponse = {
  status: 200 | 304 | 403 | 404 | 500;
  error?: string;
  result?: any;
};

interface RequestHandler {
  setNext: (RequestHandler) => void;
  handle: (request: TRequest) => TResponse;
}

class BaseRequestHandler implements RequestHandler {
  next: RequestHandler | null;
  setNext(handler: RequestHandler) {
    this.next = handler;
  }
  handle(request: TRequest): TResponse {
    if (this.next) {
      return this.next.handle(request);
    }
    return this.raiseInternalError();
  }
  raiseInternalError() {
    return {
      status: 500,
      error: "Internal Error",
    } as TResponse;
  }
}

class IPFilterHandler extends BaseRequestHandler {
  blackList: string[];
  constructor(blackList: string[]) {
    super();
    this.blackList = blackList;
  }
  handle(reqeust: TRequest): TResponse {
    const { ip } = reqeust;
    if (this.blackList.includes(ip)) {
      return {
        status: 403,
        error: "IP Blocked",
      };
    }
    if (this.next) {
      return this.next.handle(reqeust);
    }
    return this.raiseInternalError();
  }
}

class AuthorizationHandler extends BaseRequestHandler {
  handle(request: TRequest) {
    const { role } = request;
    if (role === "Admin") {
      request.expireCache = true;
      // Assume admin user always want to access the latest data
    }
    if (this.next) {
      return this.next.handle(request);
    }
    return this.raiseInternalError();
  }
}

class CacheHandler extends BaseRequestHandler {
  cache: Map<string, string>;
  constructor() {
    super();
    this.cache = new Map();
  }
  handle(request: TRequest) {
    const { query, expireCache } = request;
    if (!expireCache && this.cache.has(query)) {
      return {
        status: 304,
        result: this.cache.get(query),
      } as TResponse;
    }

    if (this.next) {
      const res = this.next!.handle(request);
      // Handler behind CacheHandler should provide a result
      // for cache write-back
      if (res.result) {
        this.cache.set(query, res.result);
      }
      return res;
    }
    return this.raiseInternalError();
  }
}

class DBHandler extends BaseRequestHandler {
  db: DB;
  constructor(db: DB) {
    super();
    this.db = db;
  }
  handle(request: TRequest): TResponse {
    const { query } = request;
    const res = this.db.get(query);
    if (res === undefined) {
      return this.raiseInternalError();
    }
    if (res === null) {
      return {
        status: 404,
        error: "Not Found",
      };
    }
    return {
      status: 200,
      result: res,
    };
  }
}

class DB {
  instance: Map<string, any>;
  online: boolean;
  constructor(data: [string, any][]) {
    this.instance = new Map();
    this.online = true;
    for (let [key, val] of data) {
      this.instance.set(key, val);
    }
  }
  get(key: string) {
    if (!this.online) return undefined;
    return this.instance.get(key) ?? null;
  }
  down() {
    this.online = false;
  }
}

export {
  TResponse,
  TRequest,
  BaseRequestHandler,
  IPFilterHandler,
  AuthorizationHandler,
  CacheHandler,
  DBHandler,
  DB,
};
