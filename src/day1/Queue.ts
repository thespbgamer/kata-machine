class Node<T> {
  value: T;
  next: Node<T> | undefined = undefined;

  constructor(value: T) {
    this.value = value;
  }
}

export default class Queue<T> {
  public length: number;

  private head: Node<T> | undefined;
  private tail: Node<T> | undefined;

  constructor() {
    this.head = this.tail = undefined;
    this.length = 0;
  }

  enqueue(item: T): void {
    const newNode = new Node(item);
    this.length++;

    if (this.tail === undefined) {
      this.tail = this.head = newNode;
      return;
    }

    this.tail.next = newNode;
    this.tail = newNode;
  }
  deque(): T | undefined {
    if (this.head === undefined && this.head === undefined) {
      return undefined;
    }
    this.length--;

    const head = this.head;
    this.head = this.head.next;

    //This is not needed in JS
    head.next = undefined;

    if (this.length === 0) {
      this.tail = undefined;
    }

    return head.value;
  }
  peek(): T | undefined {
    return this.head?.value;
  }
}
