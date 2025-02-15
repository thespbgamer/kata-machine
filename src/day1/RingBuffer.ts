//My implementation will overwrite data instead of increasing the ring buffer size
export default class RingBuffer<T> {
  private buffer: (T | undefined)[];
  private capacity: number;
  private head: number = 0;
  private tail: number = 0;
  private size: number = 0;

  constructor(capacity: number = 10) {
    this.capacity = capacity;
    this.buffer = new Array<T | undefined>(capacity).fill(undefined);
  }

  push(item: T): void {
    if (this.size === this.capacity) {
      this.head = (this.head + 1) % this.capacity;
    } else {
      this.size++;
    }
    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;
  }

  pop(): T | undefined {
    if (this.size === 0) {
      return undefined;
    }
    const item = this.buffer[this.head];
    this.buffer[this.head] = undefined;
    this.head = (this.head + 1) % this.capacity;
    this.size--;
    return item;
  }

  get(index: number): T | undefined {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of bounds");
    }
    return this.buffer[(this.head + index) % this.capacity];
  }
}
