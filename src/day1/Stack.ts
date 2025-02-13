class Node<T> {
  value: T;
  prev: Node<T> | undefined = undefined;

  constructor(value: T) {
    this.value = value;
  }
}

export default class Stack<T> {
  public length: number;
  private head: Node<T> | undefined;

  constructor() {
    this.head = undefined;
    this.length = 0;
  }

  push(item: T): void {
    const newNode = new Node(item);
    this.length++;
    if (this.head === undefined) {
      this.head = newNode;
      return;
    }

    newNode.prev = this.head;
    this.head = newNode;
  }
  pop(): T | undefined {
    this.length = Math.max(0, this.length - 1);

    if (this.length === 0) {
      const head = this.head;
      this.head = undefined;
      return head?.value;
    }
    const head = this.head as Node<T>;
    this.head = head.prev;

    return head?.value;
  }
  peek(): T | undefined {
    return this.head?.value;
  }
}
