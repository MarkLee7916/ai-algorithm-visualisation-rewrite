import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";

// Bridges streams to allow handling of cyclic dependencies
@Injectable()
export class BridgeService<T> {
    next(data: T) {
        this.bridgeSubject$.next(data);
    }

    getStream(): Observable<T> {
        return this.bridgeSubject$;
    }

    private bridgeSubject$ = new ReplaySubject<T>(1);
}