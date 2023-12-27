import { Injectable, Inject } from "@angular/core";
import { Pos, genDefaultGoalPos } from "../models/grid/pos";
import { bridgeFromGoalPos, bridgeFromGridDimensions, bridgeFromStartPos } from "../pathfinding.tokens";
import { BridgeService } from "./bridge";
import { DomUpdatesService } from "./dom-updates.service";
import { filter, map, merge, tap, withLatestFrom } from "rxjs";
import { isEqual } from "lodash";
import { GridDimensions } from "../models/grid/grid";

@Injectable({
    providedIn: 'root'
})
export class GoalPosService {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(bridgeFromStartPos) private startPos: BridgeService<Pos>,
        @Inject(bridgeFromGridDimensions) private gridDimensions: BridgeService<GridDimensions>,
        @Inject(bridgeFromGoalPos) private bridgeToOtherStreams: BridgeService<Pos>,
    ) {
        this.getStream().subscribe()
    }

    getStream() {
        return this.goalPos$;
    }

    // TODO: rewrite to use movePositionWithinBoundsOfGrid(), with a way of initialising with the default goal pos
    private resetFromGridDimensionsChange$ = this.gridDimensions.getStream().pipe(
        map(({ height, width }) => genDefaultGoalPos(height, width))
    );

    private updateFromDom$ = this.domUpdates.setGoalPos$.pipe(
        withLatestFrom(this.startPos.getStream()),
        filter(([goalPos, startPos]) => !isEqual(goalPos, startPos)),
        map(([pos,]) => pos)
    );

    private goalPos$ = merge(this.resetFromGridDimensionsChange$, this.updateFromDom$).pipe(
        tap(pos => this.bridgeToOtherStreams.next(pos))
    );
}
