import { Inject, Injectable } from "@angular/core";
import { DomUpdatesService } from "./dom-updates.service";
import { Observable, filter, map, merge, scan, tap, withLatestFrom } from "rxjs";
import { WeightGridAction } from "../models/actions/actions";
import { DEFAULT_WEIGHT, WeightGrid, initWeightGrid, setWeightAt, toggleRandomWeightAt } from "../models/grid/weight-grid";
import { ObstaclePlacedOnTileOption } from "../models/dropdown/dropdown-enums";
import * as _ from "lodash";
import { GridDimensions, adaptToNewDimensions, height, width } from "../models/grid/grid";
import { BridgeService } from "./bridge";
import { bridgeFromGridDimensions, bridgeFromWeightGrid } from "../pathfinding.tokens";

@Injectable({
    providedIn: 'root'
})
export class WeightGridService {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(bridgeFromGridDimensions) private gridDimensions: BridgeService<GridDimensions>,
        @Inject(bridgeFromWeightGrid) private bridgeToOtherStreams: BridgeService<WeightGrid>
    ) {
        this.getStream().subscribe()
    }

    private clearWeightGrid$: Observable<WeightGridAction> = this.domUpdates.clearBarrierAndWeightGrids$.pipe(
        map(() => ({ kind: 'ResetGrid' }))
    )

    private tileActivation$: Observable<WeightGridAction> = this.domUpdates.activateTile$.pipe(
        withLatestFrom(this.domUpdates.setObstaclePlacedOnTile$),
        filter(([, dataType]) => dataType === ObstaclePlacedOnTileOption.RandomWeight),
        map(([pos,]) => ({ kind: 'ToggleRandomWeightAt', row: pos.row, col: pos.col }))
    )

    private adaptToNewGridDimensions$: Observable<WeightGridAction> = this.gridDimensions.getStream().pipe(
        map(({ height, width }) => ({ kind: 'AdaptToNewDimensions', height, width }))
    )

    // TODO: make sure this stream gets a message to upgrade the grid dimensions when app starts
    private weightGrid$: Observable<WeightGrid> = merge(
        this.clearWeightGrid$,
        this.tileActivation$,
        this.adaptToNewGridDimensions$
    ).pipe(
        scan((currentGrid, action) => {
            if (action.kind === 'AddWeightAt') {
                const copy = _.cloneDeep(currentGrid);
                setWeightAt(copy, action.row, action.col, action.weight);
                return copy;
            } else if (action.kind === 'ToggleRandomWeightAt') {
                const copy = _.cloneDeep(currentGrid);
                toggleRandomWeightAt(copy, action.row, action.col);
                return copy;
            } else if (action.kind === 'ResetGrid') {
                return initWeightGrid(height(currentGrid), width(currentGrid));
            } else if (action.kind === 'NewGrid') {
                return _.cloneDeep(action.grid);
            } else if (action.kind === 'AdaptToNewDimensions') {
                const copy = _.cloneDeep(currentGrid);
                return adaptToNewDimensions(copy, DEFAULT_WEIGHT, action.height, action.width);
            } else {
                throw new Error('Unexpected action kind');
            }
        }, initWeightGrid(10, 10)),
        tap(grid => this.bridgeToOtherStreams.next(grid))
    )

    getStream() {
        return this.weightGrid$;
    }
}

