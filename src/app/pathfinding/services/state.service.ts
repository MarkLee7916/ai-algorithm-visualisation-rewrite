import { Observable } from "rxjs";

export interface StateService<T> {
    stream$: Observable<T>;
}