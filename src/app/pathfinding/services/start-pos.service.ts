import { Injectable, Inject } from "@angular/core";
import { Pos, genDefaultStartPos, isOnGrid, isSamePos, movePositionWithinBoundsOfGrid } from "../models/grid/pos";
import { barrierGrid, goalPos, gridDimensions, lastPosDraggedFrom, startPos } from "../pathfinding.tokens";
import { BridgeService } from "./bridge";
import { DomUpdatesService } from "./dom-updates.service";
import { Observable, combineLatest, debounceTime, distinctUntilChanged, filter, map, merge, of, scan, startWith, tap, throttleTime, withLatestFrom } from "rxjs";
import { StateService } from "./state.service";
import { BarrierGrid, hasBarrierAt } from "../models/grid/barrier-grid";
import { GridDimensions } from "../models/grid/grid";
import { StartOrGoalPosAction } from "../models/actions/actions";
import { DIAGONAL_NEIGHBOURS, NON_DIAGONAL_NEIGHBOURS, genNeighbouringPositions } from "../models/grid/neighbours";

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
        bridgeToOtherStreams.link(this.stream$);
    }

    private canDropAt(posToDropAt: Pos, goalPos: Pos, barrierGrid: BarrierGrid) {
        return !isSamePos(posToDropAt, goalPos) && !hasBarrierAt(barrierGrid, posToDropAt.row, posToDropAt.col);
    }

    private wasDraggedFromStart(currentStartPos: Pos, posDraggedFrom: Pos | null) {
        return posDraggedFrom && isSamePos(posDraggedFrom, currentStartPos);
    }

    private findPosToDropAt(posToDropAt: Pos, goalPos: Pos, barrierGrid: BarrierGrid, { height, width }: GridDimensions): Pos | undefined {
        const neighbours = NON_DIAGONAL_NEIGHBOURS.concat(DIAGONAL_NEIGHBOURS);

        return genNeighbouringPositions(posToDropAt, neighbours)
            .filter(pos => isOnGrid(height, width, pos))
            .find(pos => this.canDropAt(pos, goalPos, barrierGrid));
    }

    private handleDrop$: Observable<StartOrGoalPosAction> = this.domUpdates.drop$.pipe(
        throttleTime(100),
        map(tileEvent => tileEvent.pos),
        distinctUntilChanged((pos1, pos2) => isSamePos(pos1, pos2)),
        withLatestFrom(this.lastPosDraggedFrom.stream$, this.goalPos.stream$, this.barrierGrid.stream$, this.gridDimensions.stream$),
        map(([posToDropAt, lastPosDraggedFrom, goalPos, barrierGrid, gridDimensions]) => ({ kind: 'HandleDrop', posToDropAt, lastPosDraggedFrom, opposingPos: goalPos, barrierGrid, gridDimensions }))
    );

    private handleGridDimensionChange$: Observable<StartOrGoalPosAction> = this.gridDimensions.stream$.pipe(
        map(({ height, width }) => ({ kind: 'MovePositionWithinBoundsOfGrid', newHeight: height, newWidth: width }))
    );

    stream$ = merge(this.handleDrop$, this.handleGridDimensionChange$).pipe(
        scan((currentStartPos, action) => {
            if (action.kind === 'HandleDrop') {
                const { posToDropAt, lastPosDraggedFrom, opposingPos: goalPos, barrierGrid, gridDimensions } = action;

                if (!this.wasDraggedFromStart(currentStartPos, lastPosDraggedFrom)) {
                    return currentStartPos;
                } else if (this.canDropAt(posToDropAt, goalPos, barrierGrid)) {
                    return posToDropAt
                } else {
                    const validPosToDropAt = this.findPosToDropAt(posToDropAt, goalPos, barrierGrid, gridDimensions);
                    return validPosToDropAt ? validPosToDropAt : currentStartPos;
                }
            } else if (action.kind === 'MovePositionWithinBoundsOfGrid') {
                return movePositionWithinBoundsOfGrid(currentStartPos, action.newHeight, action.newWidth);
            } else {
                throw new Error('Unexpected action kind');
            }
        }, genDefaultStartPos())
    );
}
