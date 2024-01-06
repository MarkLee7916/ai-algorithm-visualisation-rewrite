import { Injectable, Inject } from "@angular/core";
import { Pos, genDefaultGoalPos, isSamePos } from "../models/grid/pos";
import { bridgeFromGoalPos, bridgeFromGridDimensions, bridgeFromStartPos } from "../pathfinding.tokens";
import { BridgeService } from "./bridge";
import { DomUpdatesService } from "./dom-updates.service";
import { filter, map, merge, tap, withLatestFrom } from "rxjs";
import { GridDimensions } from "../models/grid/grid";
import { StateService } from "./state.service";

@Injectable({
    providedIn: 'root'
})
export class GoalPosService implements StateService<Pos> {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(bridgeFromStartPos) private startPos: BridgeService<Pos>,
        @Inject(bridgeFromGridDimensions) private gridDimensions: BridgeService<GridDimensions>,
        @Inject(bridgeFromGoalPos) bridgeToOtherStreams: BridgeService<Pos>,
    ) {
        bridgeToOtherStreams.link(this.getStream());
    }

    getStream() {
        return this.goalPos$;
    }

    // TODO: rewrite to use movePositionWithinBoundsOfGrid(), instead of genDefaultGoalPos()
    private resetFromGridDimensionsChange$ = this.gridDimensions.getStream().pipe(
        map(({ height, width }) => genDefaultGoalPos(height, width))
    );

    private updateFromDom$ = this.domUpdates.setGoalPos$.pipe(
        withLatestFrom(this.startPos.getStream()),
        filter(([goalPos, startPos]) => !isSamePos(goalPos, startPos)),
        map(([pos,]) => pos)
    );

    private goalPos$ = merge(this.resetFromGridDimensionsChange$, this.updateFromDom$);
}
