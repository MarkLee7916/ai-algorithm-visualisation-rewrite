import { Observable, combineLatest, debounceTime, fromEvent, map, of, shareReplay, startWith, tap } from "rxjs";
import { GridDimensions, calculateGridDimensionsFromScreenDimensions } from "../models/grid/grid";
import { Inject, Injectable } from "@angular/core";
import { BridgeService } from "./bridge";
import { gridDimensions, pathfindingAlgos } from "../pathfinding.tokens";
import { StateService } from "./state.service";
import { DomUpdatesService } from "./dom-updates.service";
import { PathfindingAlgoOption } from "../models/dropdown/dropdown-enums";

@Injectable({
    providedIn: 'root'
})
export class GridDimensionsService implements StateService<GridDimensions> {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(gridDimensions) bridgeToOtherStreams: BridgeService<GridDimensions>,
        @Inject(pathfindingAlgos) private pathfindingAlgos: BridgeService<PathfindingAlgoOption[]>,

    ) {
        bridgeToOtherStreams.link(this.stream$);
    }

    private windowResize$ = fromEvent(window, 'resize').pipe(
        debounceTime(10),
        startWith(null)
    );

    stream$: Observable<GridDimensions> = combineLatest([this.windowResize$, this.pathfindingAlgos.stream$]).pipe(
        map(([, algos]) => {
            const modifier = 40 * Math.sqrt(Math.min(5, algos.length));

            return calculateGridDimensionsFromScreenDimensions(modifier);
        }),
        shareReplay(1)
    );
}