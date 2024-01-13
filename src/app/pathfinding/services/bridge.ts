import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { StateService } from "./state.service";

// Bridges streams to allow handling of cyclic dependencies
@Injectable()
export class BridgeService<T> implements StateService<T> {
    stream$ = new ReplaySubject<T>(1);

    link(stream: Observable<T>) {
        stream.subscribe(value => this.stream$.next(value));
    }
}