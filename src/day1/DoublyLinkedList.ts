class DoublyNode<T> {
  value: T;
  next: DoublyNode<T> | undefined = undefined;
  prev: DoublyNode<T> | undefined = undefined;

  constructor(value: T) {
    this.value = value;
  }
}

export default class DoublyLinkedList<T> {
  public length: number;
  private head: DoublyNode<T> | undefined;
  private tail: DoublyNode<T> | undefined;

  constructor() {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  prepend(item: T): void {
    const newNode = new DoublyNode(item);
    if (this.head === undefined) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
  }

  append(item: T): void {
    const newNode = new DoublyNode(item);
    if (this.tail === undefined) {
      this.head = this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
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

    if (idx === this.length) {
      this.append(item);
      return;
    }

    const newNode = new DoublyNode(item);
    let current = this.head;
    let currentIdx = 0;

    while (current !== undefined && currentIdx < idx) {
      current = current.next;
      currentIdx++;
    }

    if (current !== undefined) {
      newNode.prev = current.prev;
      newNode.next = current;

      if (current.prev !== undefined) {
        current.prev.next = newNode;
      }
      current.prev = newNode;
    }

    this.length++;
  }

  remove(item: T): T | undefined {
    if (this.head === undefined) {
      return undefined;
    }

    let current: DoublyNode<T> | undefined = this.head;

    while (current !== undefined && current.value !== item) {
      current = current.next;
    }

    if (current === undefined) {
      return undefined;
    }

    return this.removeNode(current);
  }

  get(idx: number): T | undefined {
    if (idx < 0 || idx >= this.length) {
      return undefined;
    }

    let current = this.head;
    let currentIdx = 0;

    while (current !== undefined && currentIdx < idx) {
      current = current.next;
      currentIdx++;
    }

    return current?.value;
  }

  removeAt(idx: number): T | undefined {
    if (idx < 0 || idx >= this.length) {
      return undefined;
    }

    let current = this.head;
    let currentIdx = 0;

    while (current !== undefined && currentIdx < idx) {
      current = current.next;
      currentIdx++;
    }

    if (current === undefined) {
      return undefined;
    }

    return this.removeNode(current);
  }

  private removeNode(node: DoublyNode<T>): T | undefined {
    if (node.prev !== undefined) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }

    if (node.next !== undefined) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }

    this.length--;
    return node.value;
  }
}
