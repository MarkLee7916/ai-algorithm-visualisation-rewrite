import { Observable, combineLatest, debounceTime, fromEvent, map, of, startWith, tap } from "rxjs";
import { GridDimensions, calculateGridDimensionsFromScreenDimensions } from "../models/grid/grid";
import { Inject, Injectable } from "@angular/core";
import { BridgeService } from "./bridge";
import { gridDimensions } from "../pathfinding.tokens";
import { StateService } from "./state.service";
import { DomUpdatesService } from "./dom-updates.service";

@Injectable({
    providedIn: 'root'
})
export class GridDimensionsService implements StateService<GridDimensions> {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(gridDimensions) bridgeToOtherStreams: BridgeService<GridDimensions>
    ) {
        bridgeToOtherStreams.link(this.stream$);
    }

    private windowResize$ = fromEvent(window, 'resize').pipe(
        debounceTime(10),
        startWith(null)
    );

    stream$: Observable<GridDimensions> = combineLatest([this.windowResize$, this.domUpdates.setDualMode$]).pipe(
        map(([, isInDualMode]) => {
            const modifier = isInDualMode ? 80 : 40;
            return calculateGridDimensionsFromScreenDimensions(modifier);
        })
    );
}