import { Injectable, Inject } from "@angular/core";
import { Pos, genDefaultGoalPos, isSamePos, movePositionWithinBoundsOfGrid } from "../models/grid/pos";
import { barrierGrid, startPos, gridDimensions, lastPosDraggedFrom, goalPos } from "../pathfinding.tokens";
import { BridgeService } from "./bridge";
import { DomUpdatesService } from "./dom-updates.service";
import { Observable, combineLatest, filter, map, merge, of, scan, startWith, tap, throttleTime, withLatestFrom } from "rxjs";
import { StateService } from "./state.service";
import { BarrierGrid, hasBarrierAt } from "../models/grid/barrier-grid";
import { GridDimensions } from "../models/grid/grid";
import { StartOrGoalPosAction } from "../models/actions/actions";

@Injectable({
    providedIn: 'root'
})
export class GoalPosService implements StateService<Pos> {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(startPos) private startPos: BridgeService<Pos>,
        @Inject(lastPosDraggedFrom) private lastPosDraggedFrom: BridgeService<Pos | null>,
        @Inject(barrierGrid) private barrierGrid: BridgeService<BarrierGrid>,
        @Inject(gridDimensions) private gridDimensions: BridgeService<GridDimensions>,
        @Inject(goalPos) bridgeToOtherStreams: BridgeService<Pos>,
    ) {
        bridgeToOtherStreams.link(this.stream$);
    }

    private canDropAt(posToDropAt: Pos, startPos: Pos, barrierGrid: BarrierGrid) {
        return !isSamePos(posToDropAt, startPos) && !hasBarrierAt(barrierGrid, posToDropAt.row, posToDropAt.col);
    }

    private wasDraggedFromGoal(currentGoalPos: Pos, posDraggedFrom: Pos | null) {
        return posDraggedFrom && isSamePos(posDraggedFrom, currentGoalPos);
    }

    private handleDrop$: Observable<StartOrGoalPosAction> = this.domUpdates.drop$.pipe(
        throttleTime(100),
        map(tileEvent => tileEvent.pos),
        withLatestFrom(this.lastPosDraggedFrom.stream$, this.startPos.stream$, this.barrierGrid.stream$),
        map(([posToDropAt, lastPosDraggedFrom, startPos, barrierGrid]) => ({ kind: 'HandleDrop', posToDropAt, lastPosDraggedFrom, opposingPos: startPos, barrierGrid }))
    );

    private handleGridDimensionChange$: Observable<StartOrGoalPosAction> = this.gridDimensions.stream$.pipe(
        map(({ height, width }) => ({ kind: 'MovePositionWithinBoundsOfGrid', newHeight: height, newWidth: width }))
    );

    stream$ = merge(this.handleDrop$, this.handleGridDimensionChange$).pipe(
        scan((currentGoalPos, action) => {
            if (action.kind === 'HandleDrop') {
                const { posToDropAt, lastPosDraggedFrom, opposingPos: startPos, barrierGrid } = action;
                const canDrop = this.wasDraggedFromGoal(currentGoalPos, lastPosDraggedFrom) && this.canDropAt(posToDropAt, startPos, barrierGrid);
                return canDrop ? posToDropAt : currentGoalPos;
            } else if (action.kind === 'MovePositionWithinBoundsOfGrid') {
                return movePositionWithinBoundsOfGrid(currentGoalPos, action.newHeight, action.newWidth);
            } else {
                throw new Error('Unexpected action kind');
            }
        }, genDefaultGoalPos())
    );
}
