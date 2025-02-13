class Node<T> {
  value: T;
  next: Node<T> | undefined = undefined;

  constructor(value: T) {
    this.value = value;
  }
}

export default class SinglyLinkedList<T> {
  public length: number;
  private head: Node<T> | undefined;

  constructor() {
    this.length = 0;
    this.head = undefined;
  }

  prepend(item: T): void {
    const newNode = new Node(item);
    if (this.head === undefined) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  append(item: T): void {
    const newNode = new Node(item);
    if (this.head === undefined) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== undefined) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.length++;
  }

  insertAt(item: T, idx: number): void {
    if (idx < 0 || idx > this.length) {
      throw new RangeError("Index out of bounds");
    }

    if (idx === 0) {
      this.prepend(item);
      return;
    }

    const newNode = new Node(item);
    let current = this.head;
    let prev: Node<T> | undefined = undefined;
    let currentIdx = 0;

    while (current !== undefined && currentIdx < idx) {
      prev = current;
      current = current.next;
      currentIdx++;
    }

    if (prev !== undefined) {
      newNode.next = prev.next;
      prev.next = newNode;
    }
    this.length++;
  }

  remove(item: T): T | undefined {
    if (this.head === undefined) {
      return undefined;
    }

    if (this.head.value === item) {
      const removedValue = this.head.value;
      this.head = this.head.next;
      this.length--;
      return removedValue;
    }

    let current: Node<T> | undefined = this.head;
    let prev: Node<T> | undefined = undefined;

    while (current !== undefined && current.value !== item) {
      prev = current;
      current = current.next;
    }

    if (current === undefined) {
      return undefined;
    }

    if (prev !== undefined) {
      prev.next = current.next;
    }

    this.length--;
    return current.value;
  }

  get(idx: number): T | undefined {
    if (idx < 0 || idx >= this.length) {
      return undefined;
    }

    let current = this.head;
    let currentIdx = 0;

    while (current !== undefined) {
      if (currentIdx === idx) {
        return current.value;
      }
      current = current.next;
      currentIdx++;
    }

    return undefined;
  }

  removeAt(idx: number): T | undefined {
    if (idx < 0 || idx >= this.length) {
      return undefined;
    }

    if (idx === 0 && this.head !== undefined) {
      const removedValue = this.head.value;
      this.head = this.head.next;
      this.length--;
      return removedValue;
    }

    let current = this.head;
    let prev: Node<T> | undefined = undefined;
    let currentIdx = 0;

    while (current !== undefined && currentIdx < idx) {
      prev = current;
      current = current.next;
      currentIdx++;
    }

    if (prev !== undefined && current !== undefined) {
      prev.next = current.next;
      this.length--;
      return current.value;
    }

    return undefined;
  }
}
