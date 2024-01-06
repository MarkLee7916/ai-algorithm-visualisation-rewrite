import { Inject, Injectable } from "@angular/core";
import { goalPos, gridDimensions } from "../pathfinding.tokens";
import { GridDimensions } from "../models/grid/grid";
import { BridgeService } from "./bridge";
import { combineLatest } from "rxjs";
import { HeuristicDistFromGoalGrid, createHeuristicDistFromGoalGrid } from "../models/grid/heuristic-dist-from-goal-grid";
import { Pos } from "../models/grid/pos";
import { StateService } from "./state.service";

@Injectable({
    providedIn: 'root'
})
export class HeuristicDistGridService {
    constructor(
        @Inject(gridDimensions) private gridDimensions: BridgeService<GridDimensions>,
        @Inject(goalPos) private goalPos: BridgeService<Pos>,
    ) {

    }

    getStream() {
        return this.heuristicDistGrid$;
    }

    heuristicDistGrid$ = combineLatest([this.gridDimensions.getStream(), this.goalPos.getStream()],
        ({ height, width }, goalPos) => createHeuristicDistFromGoalGrid(height, width, goalPos)
    );
}