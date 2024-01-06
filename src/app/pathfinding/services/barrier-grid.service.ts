import { Injectable, Inject } from "@angular/core";
import { BarrierGrid, NO_BARRIER, initBarrierGrid, toggleBarrierAt } from "../models/grid/barrier-grid";
import { GridDimensions, adaptToNewDimensions, height, width } from "../models/grid/grid";
import { bridgeFromBarrierGrid, bridgeFromGridDimensions } from "../pathfinding.tokens";
import { BridgeService } from "./bridge";
import { DomUpdatesService } from "./dom-updates.service";
import { BarrierGridAction } from "../models/actions/actions";
import { Observable, filter, map, merge, scan, tap, withLatestFrom } from "rxjs";
import { ObstaclePlacedOnTileOption } from "../models/dropdown/dropdown-enums";
import * as _ from "lodash";
import { StateService } from "./state.service";

@Injectable({
    providedIn: 'root'
})
export class BarrierGridService implements StateService<BarrierGrid> {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(bridgeFromGridDimensions) private gridDimensions: BridgeService<GridDimensions>,
        @Inject(bridgeFromBarrierGrid) bridgeToOtherStreams: BridgeService<BarrierGrid>
    ) {
        bridgeToOtherStreams.link(this.getStream());
    }

    private clearBarrierGrid$: Observable<BarrierGridAction> = this.domUpdates.clearBarrierAndWeightGrids$.pipe(
        map(() => ({ kind: 'ResetGrid' }))
    )

    private tileActivation$: Observable<BarrierGridAction> = this.domUpdates.activateTile$.pipe(
        withLatestFrom(this.domUpdates.setObstaclePlacedOnTile$),
        filter(([, dataType]) => dataType === ObstaclePlacedOnTileOption.Barrier),
        map(([pos,]) => ({ kind: 'ToggleBarrierAt', row: pos.row, col: pos.col }))
    )

    private adaptToNewGridDimensions$: Observable<BarrierGridAction> = this.gridDimensions.getStream().pipe(
        map(({ height, width }) => ({ kind: 'AdaptToNewDimensions', height, width }))
    )

    private barrierGrid$: Observable<BarrierGrid> = merge(
        this.clearBarrierGrid$,
        this.tileActivation$,
        this.adaptToNewGridDimensions$
    ).pipe(
        scan((currentGrid, action) => {
            if (action.kind === 'ToggleBarrierAt') {
                const copy = _.cloneDeep(currentGrid);
                toggleBarrierAt(copy, action.row, action.col);
                return copy;
            } else if (action.kind === 'ResetGrid') {
                return initBarrierGrid(height(currentGrid), width(currentGrid));
            } else if (action.kind === 'NewGrid') {
                return _.cloneDeep(action.grid);
            } else if (action.kind === 'AdaptToNewDimensions') {
                const copy = _.cloneDeep(currentGrid);
                return adaptToNewDimensions(copy, NO_BARRIER, action.height, action.width);
            } else {
                throw new Error('Unexpected action kind');
            }
            // TODO: find out a way to not have to do this
        }, initBarrierGrid(30, 30))
    )

    getStream() {
        return this.barrierGrid$;
    }
}