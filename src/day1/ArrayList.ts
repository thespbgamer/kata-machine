export default class ArrayList<T> {
  public length: number;
  private capacity: number;
  private data: T[];

  constructor(capacity: number = 10) {
    this.length = 0;
    this.capacity = capacity;
    this.data = new Array(capacity);
  }

  private resize(): void {
    this.capacity *= 2;
    const newData = new Array<T>(this.capacity);
    for (let i = 0; i < this.length; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
  }

  prepend(item: T): void {
    if (this.length === this.capacity) {
      this.resize();
    }
    for (let i = this.length; i > 0; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[0] = item;
    this.length++;
  }

  append(item: T): void {
    if (this.length === this.capacity) {
      this.resize();
    }
    this.data[this.length] = item;
    this.length++;
  }

  insertAt(item: T, idx: number): void {
    if (idx < 0 || idx > this.length) {
      throw new RangeError("Index out of bounds");
    }

    if (this.length === this.capacity) {
      this.resize();
    }

    for (let i = this.length; i > idx; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[idx] = item;
    this.length++;
  }

  remove(item: T): T | undefined {
    for (let i = 0; i < this.length; i++) {
      if (this.data[i] === item) {
        return this.removeAt(i);
      }
    }
    return undefined;
  }

  get(idx: number): T | undefined {
    if (idx < 0 || idx >= this.length) {
      return undefined;
    }
    return this.data[idx];
  }

  removeAt(idx: number): T | undefined {
    if (idx < 0 || idx >= this.length) {
      return undefined;
    }

    const removedItem = this.data[idx];

    for (let i = idx; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }

    this.length--;
    return removedItem;
  }
}
