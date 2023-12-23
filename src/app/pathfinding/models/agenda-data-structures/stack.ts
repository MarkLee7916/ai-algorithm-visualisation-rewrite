import { Agenda } from "./agenda";

// Adapter pattern implementation of a stack
export class Stack<T> implements Agenda<T> {
    private readonly stack: T[];

    constructor() {
        this.stack = [];
    }

    public add(item: T): void {
        this.stack.push(item);
    }

    public remove(): T {
        if (this.isEmpty()) {
            throw new Error('Can not remove from empty stack');
        }

        return this.stack.pop() as T;
    }

    public isEmpty(): boolean {
        return this.stack.length === 0;
    }
}