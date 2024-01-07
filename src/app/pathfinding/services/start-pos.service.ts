import { Injectable, Inject } from "@angular/core";
import { Pos, genDefaultStartPos, isSamePos, movePositionWithinBoundsOfGrid } from "../models/grid/pos";
import { barrierGrid, goalPos, gridDimensions, lastPosDraggedFrom, startPos } from "../pathfinding.tokens";
import { BridgeService } from "./bridge";
import { DomUpdatesService } from "./dom-updates.service";
import { Observable, combineLatest, debounceTime, distinctUntilChanged, filter, map, merge, of, scan, startWith, tap, throttleTime, withLatestFrom } from "rxjs";
import { StateService } from "./state.service";
import { BarrierGrid, hasBarrierAt } from "../models/grid/barrier-grid";
import { GridDimensions } from "../models/grid/grid";
import { StartOrGoalPosAction } from "../models/actions/actions";

@Injectable({
    providedIn: 'root'
})
export class StartPosService implements StateService<Pos> {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(goalPos) private goalPos: BridgeService<Pos>,
        @Inject(lastPosDraggedFrom) private lastPosDraggedFrom: BridgeService<Pos | null>,
        @Inject(barrierGrid) private barrierGrid: BridgeService<BarrierGrid>,
        @Inject(gridDimensions) private gridDimensions: BridgeService<GridDimensions>,
        @Inject(startPos) bridgeToOtherStreams: BridgeService<Pos>,
    ) {
        bridgeToOtherStreams.link(this.getStream());
    }

    getStream() {
        return this.startPos$;
    }

    private canDropAt(posToDropAt: Pos, goalPos: Pos, barrierGrid: BarrierGrid) {
        return !isSamePos(posToDropAt, goalPos) && !hasBarrierAt(barrierGrid, posToDropAt.row, posToDropAt.col);
    }

    private wasDraggedFromStart(currentStartPos: Pos, posDraggedFrom: Pos | null) {
        return posDraggedFrom && isSamePos(posDraggedFrom, currentStartPos);
    }

    handleDrop$: Observable<StartOrGoalPosAction> = this.domUpdates.drop$.pipe(
        throttleTime(100),
        map(tileEvent => tileEvent.pos),
        distinctUntilChanged((pos1, pos2) => isSamePos(pos1, pos2)),
        withLatestFrom(this.lastPosDraggedFrom.getStream(), this.goalPos.getStream(), this.barrierGrid.getStream()),
        map(([posToDropAt, lastPosDraggedFrom, goalPos, barrierGrid]) => ({ kind: 'HandleDrop', posToDropAt, lastPosDraggedFrom, opposingPos: goalPos, barrierGrid }))
    );

    handleGridDimensionChange$: Observable<StartOrGoalPosAction> = this.gridDimensions.getStream().pipe(
        map(({ height, width }) => ({ kind: 'MovePositionWithinBoundsOfGrid', newHeight: height, newWidth: width }))
    );

    private startPos$ = merge(this.handleDrop$, this.handleGridDimensionChange$).pipe(
        scan((currentStartPos, action) => {
            if (action.kind === 'HandleDrop') {
                const { posToDropAt, lastPosDraggedFrom, opposingPos: goalPos, barrierGrid } = action;
                const canDrop = this.wasDraggedFromStart(currentStartPos, lastPosDraggedFrom) && this.canDropAt(posToDropAt, goalPos, barrierGrid);
                return canDrop ? posToDropAt : currentStartPos;
            } else if (action.kind === 'MovePositionWithinBoundsOfGrid') {
                return movePositionWithinBoundsOfGrid(currentStartPos, action.newHeight, action.newWidth);
            } else {
                throw new Error('Unexpected action kind');
            }
        }, genDefaultStartPos())
    );
}
