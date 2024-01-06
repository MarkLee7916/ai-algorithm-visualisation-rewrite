import { Observable } from "rxjs";
import { BridgeService } from "./bridge";

export abstract class StateService<T> {
    constructor(bridge: BridgeService<T>) {
        this.getStream().subscribe(value => bridge.next(value));
    }

    abstract getStream(): Observable<T>;
}