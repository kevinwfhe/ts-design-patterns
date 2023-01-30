class Database {
  private static instance: Database;
  private table: {};
  private constructor() {
    this.table = {};
  }

  static getInstance() {
    if (Database.instance === undefined) {
      // acquire lock
      Database.instance = new Database();
      // release lock
    }
    return Database.instance;
  }

  public read(key) {
    return this.table[key];
  }

  public write(key, value) {
    this.table[key] = value;
  }
}

export { Database };
