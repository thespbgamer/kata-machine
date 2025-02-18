class TrieNode {
  children: { [key: string]: TrieNode } = {};
  isEndOfWord: boolean = false;
}

export default class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let current = this.root;

    for (let char of word) {
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }

    current.isEndOfWord = true;
  }

  find(prefix: string): string[] {
    const results: string[] = [];
    let current = this.root;

    for (let char of prefix) {
      if (!current.children[char]) {
        return results;
      }
      current = current.children[char];
    }

    this.searchHelper(current, prefix, results);

    return results;
  }

  delete(word: string): void {
    this.deleteHelper(this.root, word, 0);
  }

  private searchHelper(node: TrieNode, prefix: string, results: string[]): void {
    if (node.isEndOfWord) {
      results.push(prefix);
    }

    for (let char in node.children) {
      this.searchHelper(node.children[char], prefix + char, results);
    }
  }

  private deleteHelper(node: TrieNode, word: string, depth: number): boolean {
    if (!node) {
      return false;
    }

    if (depth === word.length) {
      // Only delete if it’s an end-of-word node
      if (!node.isEndOfWord) {
        return false;
      }
      node.isEndOfWord = false;

      return Object.keys(node.children).length === 0;
    }

    const char = word[depth];
    if (!this.deleteHelper(node.children[char], word, depth + 1)) {
      return false;
    }

    delete node.children[char];

    return Object.keys(node.children).length === 0 && !node.isEndOfWord;
  }
}
