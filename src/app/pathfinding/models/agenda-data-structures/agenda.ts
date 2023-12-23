export interface Agenda<T> {
    add: (item: T) => void;
    remove: () => T;
    isEmpty: () => boolean;
}
