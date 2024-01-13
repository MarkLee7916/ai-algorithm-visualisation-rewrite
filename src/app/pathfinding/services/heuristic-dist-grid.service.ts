import { Inject, Injectable } from "@angular/core";
import { goalPos, gridDimensions, heuristicDistGrid } from "../pathfinding.tokens";
import { GridDimensions } from "../models/grid/grid";
import { BridgeService } from "./bridge";
import { Observable, combineLatest } from "rxjs";
import { HeuristicDistFromGoalGrid, createHeuristicDistFromGoalGrid } from "../models/grid/heuristic-dist-from-goal-grid";
import { Pos } from "../models/grid/pos";
import { StateService } from "./state.service";

@Injectable({
    providedIn: 'root'
})
export class HeuristicDistGridService implements StateService<HeuristicDistFromGoalGrid> {
    constructor(
        @Inject(gridDimensions) private gridDimensions: BridgeService<GridDimensions>,
        @Inject(goalPos) private goalPos: BridgeService<Pos>,
        @Inject(heuristicDistGrid) bridgeToOtherStreams: BridgeService<HeuristicDistFromGoalGrid>,
    ) {
        bridgeToOtherStreams.link(this.stream$);
    }

    stream$: Observable<HeuristicDistFromGoalGrid> = combineLatest([this.gridDimensions.stream$, this.goalPos.stream$],
        ({ height, width }, goalPos) => createHeuristicDistFromGoalGrid(height, width, goalPos)
    );
}