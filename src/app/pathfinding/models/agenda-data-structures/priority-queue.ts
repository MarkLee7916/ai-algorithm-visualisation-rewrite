import { Comparator } from "../../algos/comparators";
import { Agenda } from "./agenda";

// This could be made more efficient by using a heap, but performance is sufficient for how fast pathfinding algos are computed
export class PriorityQueue<T> implements Agenda<T> {
    private readonly queue: T[];

    private readonly comparator: Comparator<T>;

    constructor(Comparator: Comparator<T>) {
        this.comparator = Comparator;
        this.queue = [];
    }

    public add(elem: T): void {
        this.queue.push(elem);
    }

    public remove(): T {
        if (this.isEmpty()) {
            throw new Error('Can not remove from empty queue');
        }

        this.queue.sort(this.comparator);

        return this.queue.shift() as T;
    }

    public isEmpty(): boolean {
        return this.queue.length === 0;
    }
}