export default class Map<T extends string | number, V> {
  private map: Partial<{ [key in T]: V }>;

  constructor() {
    this.map = {};
  }

  get(key: T): V | undefined {
    return this.map[key];
  }

  set(key: T, value: V): void {
    this.map[key] = value;
  }

  delete(key: T): V | undefined {
    const value = this.map[key];
    delete this.map[key];
    return value;
  }

  size(): number {
    return Object.keys(this.map).length;
  }
}
