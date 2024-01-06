import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { StateService } from "./state.service";

// Bridges streams to allow handling of cyclic dependencies
@Injectable()
export class BridgeService<T> implements StateService<T> {
    next(data: T) {
        this.bridgeSubject$.next(data);
    }

    getStream(): Observable<T> {
        return this.bridgeSubject$;
    }

    link(stream: Observable<T>) {
        stream.subscribe(value => this.next(value));
    }

    private bridgeSubject$ = new ReplaySubject<T>(1);
}