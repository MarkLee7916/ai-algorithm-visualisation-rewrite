import { Observable, debounceTime, fromEvent, map, of, startWith, tap } from "rxjs";
import { GridDimensions, calculateGridDimensionsFromScreenDimensions } from "../models/grid/grid";
import { Inject, Injectable } from "@angular/core";
import { BridgeService } from "./bridge";
import { bridgeFromGridDimensions } from "../pathfinding.tokens";

@Injectable({
    providedIn: 'root'
})
export class GridDimensionsService {
    constructor(@Inject(bridgeFromGridDimensions) private bridgeToOtherStreams: BridgeService<GridDimensions>) {
        this.getStream().subscribe()
    }

    private windowResize$ = fromEvent(window, 'resize').pipe(
        debounceTime(1000),
        startWith(null)
    );

    // TODO: Pipe from changes in dual grids and changes in screen size

    private dimensions$: Observable<GridDimensions> = this.windowResize$.pipe(
        map(() => calculateGridDimensionsFromScreenDimensions()),
        tap(dimensions => this.bridgeToOtherStreams.next(dimensions))
    );

    getStream() {
        return this.dimensions$;
    }
}