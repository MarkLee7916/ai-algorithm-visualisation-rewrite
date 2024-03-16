import { Inject, Injectable } from "@angular/core";
import { DomUpdatesService } from "./dom-updates.service";
import { Observable, filter, map, merge, scan, shareReplay, switchMap, tap, withLatestFrom } from "rxjs";
import { WeightGridAction } from "../models/actions/actions";
import { DEFAULT_WEIGHT, WeightGrid, initWeightGrid, setWeightAt, toggleRandomWeightAt } from "../models/grid/weight-grid";
import { ObstaclePlacedOnTileOption } from "../models/dropdown/dropdown-enums";
import { GridDimensions, adaptToNewDimensions, height, width } from "../models/grid/grid";
import { BridgeService } from "./bridge";
import { goalPos, gridDimensions, startPos, weightGrid } from "../pathfinding.tokens";
import { StateService } from "./state.service";
import { Pos, isSamePos } from "../models/grid/pos";
import { deepCopy } from "../../shared/utils";
import { getListOfPositionsToActivate } from "../algos/maze-gen-algos";
import { mazeGenAlgoOptionToImpl } from "../models/dropdown/dropdown-enum-mappings";

@Injectable({
    providedIn: 'root'
})
export class WeightGridService implements StateService<WeightGrid> {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(gridDimensions) private gridDimensions: BridgeService<GridDimensions>,
        @Inject(startPos) private startPos: BridgeService<Pos>,
        @Inject(goalPos) private goalPos: BridgeService<Pos>,
        @Inject(weightGrid) bridgeToOtherStreams: BridgeService<WeightGrid>
    ) {
        bridgeToOtherStreams.link(this.stream$);
    }

    private clearWeightGridFromUserInput$: Observable<WeightGridAction> = this.domUpdates.clearBarrierAndWeightGrids$.pipe(
        map(() => ({ kind: 'ResetGrid' }))
    )

    private clearWeightGridToGenerateMaze$: Observable<WeightGridAction> = this.domUpdates.generateMaze$.pipe(
        map(() => ({ kind: 'ResetGrid' }))
    )

    private generateMaze$: Observable<Pos> = this.domUpdates.generateMaze$.pipe(
        withLatestFrom(this.domUpdates.setObstaclePlacedOnTile$, this.domUpdates.setMazeGenAlgo$, this.gridDimensions.stream$),
        filter(([, dataType, ,]) => dataType === ObstaclePlacedOnTileOption.RandomWeight),
        switchMap(([, , algo, dimensions]) => {
            const mazeAlgoImpl = mazeGenAlgoOptionToImpl.get(algo);
            const maze = mazeAlgoImpl(dimensions.height, dimensions.width);
            return getListOfPositionsToActivate(maze);
        })
    )

    private tileActivation$: Observable<WeightGridAction> = merge(this.domUpdates.activateTile$, this.generateMaze$).pipe(
        withLatestFrom(this.domUpdates.setObstaclePlacedOnTile$, this.startPos.stream$, this.goalPos.stream$),
        filter(([posActivated, dataType, startPos, goalPos]) => !isSamePos(startPos, posActivated) && !isSamePos(goalPos, posActivated) && dataType === ObstaclePlacedOnTileOption.RandomWeight),
        map(([pos, , ,]) => ({ kind: 'ToggleRandomWeightAt', row: pos.row, col: pos.col }))
    )

    private adaptToNewGridDimensions$: Observable<WeightGridAction> = this.gridDimensions.stream$.pipe(
        map(({ height, width }) => ({ kind: 'AdaptToNewDimensions', height, width }))
    )

    stream$: Observable<WeightGrid> = merge(
        this.clearWeightGridFromUserInput$,
        this.clearWeightGridToGenerateMaze$,
        this.tileActivation$,
        this.adaptToNewGridDimensions$
    ).pipe(
        scan((currentGrid, action) => {
            if (action.kind === 'AddWeightAt') {
                const copy = deepCopy(currentGrid);
                setWeightAt(copy, action.row, action.col, action.weight);
                return copy;
            } else if (action.kind === 'ToggleRandomWeightAt') {
                const copy = deepCopy(currentGrid);
                toggleRandomWeightAt(copy, action.row, action.col);
                return copy;
            } else if (action.kind === 'ResetGrid') {
                return initWeightGrid(height(currentGrid), width(currentGrid));
            } else if (action.kind === 'NewGrid') {
                return deepCopy(action.grid);
            } else if (action.kind === 'AdaptToNewDimensions') {
                const copy = deepCopy(currentGrid);
                return adaptToNewDimensions(copy, DEFAULT_WEIGHT, action.height, action.width);
            } else {
                throw new Error('Unexpected action kind');
            }
        }, initWeightGrid(1, 1)),
        shareReplay(1),
    )
}

