import { Observable } from "rxjs";
import { BridgeService } from "./bridge";

export interface StateService<T> {
    stream$: Observable<T>;
}