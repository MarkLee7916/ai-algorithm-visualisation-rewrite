import { Agenda } from "./agenda";

// This could be made more efficient by using a linked list, but performance is sufficient for how fast algorithms are computed
export class Queue<T> implements Agenda<T> {
    private readonly queue: T[];

    constructor() {
        this.queue = [];
    }

    public add(item: T): void {
        this.queue.push(item);
    }

    public remove(): T {
        if (this.isEmpty()) {
            throw new Error('Can not remove from empty queue');
        }

        return this.queue.shift() as T;
    }

    public isEmpty(): boolean {
        return this.queue.length === 0;
    }
}
