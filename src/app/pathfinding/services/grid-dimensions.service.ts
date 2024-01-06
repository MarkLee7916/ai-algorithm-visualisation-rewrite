import { Observable, debounceTime, fromEvent, map, of, startWith, tap } from "rxjs";
import { GridDimensions, calculateGridDimensionsFromScreenDimensions } from "../models/grid/grid";
import { Inject, Injectable } from "@angular/core";
import { BridgeService } from "./bridge";
import { bridgeFromGridDimensions } from "../pathfinding.tokens";
import { StateService } from "./state.service";

@Injectable({
    providedIn: 'root'
})
export class GridDimensionsService implements StateService<GridDimensions> {
    constructor(@Inject(bridgeFromGridDimensions) bridgeToOtherStreams: BridgeService<GridDimensions>) {
        bridgeToOtherStreams.link(this.getStream());
    }

    private windowResize$ = fromEvent(window, 'resize').pipe(
        debounceTime(1000),
        startWith(null)
    );

    // TODO: Pipe from changes in dual grids and changes in screen size
    private dimensions$: Observable<GridDimensions> = this.windowResize$.pipe(
        map(() => calculateGridDimensionsFromScreenDimensions())
    );

    getStream() {
        return this.dimensions$;
    }
}