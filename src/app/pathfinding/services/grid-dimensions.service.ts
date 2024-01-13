import { Observable, debounceTime, fromEvent, map, of, startWith, tap } from "rxjs";
import { GridDimensions, calculateGridDimensionsFromScreenDimensions } from "../models/grid/grid";
import { Inject, Injectable } from "@angular/core";
import { BridgeService } from "./bridge";
import { gridDimensions } from "../pathfinding.tokens";
import { StateService } from "./state.service";

@Injectable({
    providedIn: 'root'
})
export class GridDimensionsService implements StateService<GridDimensions> {
    constructor(@Inject(gridDimensions) bridgeToOtherStreams: BridgeService<GridDimensions>) {
        bridgeToOtherStreams.link(this.stream$);
    }

    private windowResize$ = fromEvent(window, 'resize').pipe(
        debounceTime(10),
        startWith(null)
    );

    // TODO: Pipe from changes in dual grids
    stream$: Observable<GridDimensions> = this.windowResize$.pipe(
        map(() => calculateGridDimensionsFromScreenDimensions())
    );
}