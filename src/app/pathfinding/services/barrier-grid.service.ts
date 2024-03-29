import { Injectable, Inject } from "@angular/core";
import { BarrierGrid, NO_BARRIER, initBarrierGrid, toggleBarrierAt } from "../models/grid/barrier-grid";
import { GridDimensions, adaptToNewDimensions, height, width } from "../models/grid/grid";
import { barrierGrid, goalPos, gridDimensions, startPos } from "../pathfinding.tokens";
import { BridgeService } from "./bridge";
import { DomUpdatesService } from "./dom-updates.service";
import { BarrierGridAction } from "../models/actions/actions";
import { Observable, filter, map, merge, scan, shareReplay, switchMap, withLatestFrom } from "rxjs";
import { ObstaclePlacedOnTileOption } from "../models/dropdown/dropdown-enums";
import { StateService } from "./state.service";
import { Pos, isSamePos } from "../models/grid/pos";
import { deepCopy } from "../../shared/utils";
import { mazeGenAlgoOptionToImpl } from "../models/dropdown/dropdown-enum-mappings";
import { getListOfPositionsToActivate } from "../algos/maze-gen-algos";

@Injectable({
    providedIn: 'root'
})
export class BarrierGridService implements StateService<BarrierGrid> {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(startPos) private startPos: BridgeService<Pos>,
        @Inject(goalPos) private goalPos: BridgeService<Pos>,
        @Inject(gridDimensions) private gridDimensions: BridgeService<GridDimensions>,
        @Inject(barrierGrid) bridgeToOtherStreams: BridgeService<BarrierGrid>
    ) {
        bridgeToOtherStreams.link(this.stream$);
    }

    private clearBarrierGridFromUserInput$: Observable<BarrierGridAction> = this.domUpdates.clearBarrierAndWeightGrids$.pipe(
        map(() => ({ kind: 'ResetGrid' }))
    )

    private clearBarrierGridToGenerateMaze$: Observable<BarrierGridAction> = this.domUpdates.generateMaze$.pipe(
        map(() => ({ kind: 'ResetGrid' }))
    )

    private generateMaze$: Observable<Pos> = this.domUpdates.generateMaze$.pipe(
        withLatestFrom(this.domUpdates.obstaclePlacedOnTile$, this.gridDimensions.stream$),
        filter(([, dataType,]) => dataType === ObstaclePlacedOnTileOption.Barrier),
        switchMap(([algo, , dimensions]) => {
            const mazeAlgoImpl = mazeGenAlgoOptionToImpl.get(algo);
            const maze = mazeAlgoImpl(dimensions.height, dimensions.width);
            return getListOfPositionsToActivate(maze);
        })
    )

    private posActivation$: Observable<BarrierGridAction> = merge(this.domUpdates.activateAtPos$, this.generateMaze$).pipe(
        withLatestFrom(this.domUpdates.obstaclePlacedOnTile$, this.startPos.stream$, this.goalPos.stream$),
        filter(([posActivated, dataType, startPos, goalPos]) => !isSamePos(startPos, posActivated) && !isSamePos(goalPos, posActivated) && dataType === ObstaclePlacedOnTileOption.Barrier),
        map(([posActivated, , ,]) => ({ kind: 'ToggleBarrierAt', row: posActivated.row, col: posActivated.col }))
    )

    private adaptToNewGridDimensions$: Observable<BarrierGridAction> = this.gridDimensions.stream$.pipe(
        map(({ height, width }) => ({ kind: 'AdaptToNewDimensions', height, width }))
    )

    stream$: Observable<BarrierGrid> = merge(
        this.clearBarrierGridFromUserInput$,
        this.clearBarrierGridToGenerateMaze$,
        this.posActivation$,
        this.adaptToNewGridDimensions$
    ).pipe(
        scan((currentGrid, action) => {
            if (action.kind === 'ToggleBarrierAt') {
                const copy = deepCopy(currentGrid);
                toggleBarrierAt(copy, action.row, action.col);
                return copy;
            } else if (action.kind === 'ResetGrid') {
                return initBarrierGrid(height(currentGrid), width(currentGrid));
            } else if (action.kind === 'NewGrid') {
                return deepCopy(action.grid);
            } else if (action.kind === 'AdaptToNewDimensions') {
                return adaptToNewDimensions(currentGrid, NO_BARRIER, action.height, action.width);
            } else {
                throw new Error('Unexpected action kind');
            }
        }, initBarrierGrid(1, 1)),
        shareReplay(1),
    )
}