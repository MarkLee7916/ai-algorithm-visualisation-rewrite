import { Inject, Injectable } from "@angular/core";
import { bridgeFromGoalPos, bridgeFromGridDimensions } from "../pathfinding.tokens";
import { GridDimensions } from "../models/grid/grid";
import { BridgeService } from "./bridge";
import { combineLatest } from "rxjs";
import { createHeuristicDistFromGoalGrid } from "../models/grid/heuristic-dist-from-goal-grid";
import { Pos } from "../models/grid/pos";

@Injectable({
    providedIn: 'root'
})
export class HeuristicDistGridService {
    constructor(
        @Inject(bridgeFromGridDimensions) private gridDimensions: BridgeService<GridDimensions>,
        @Inject(bridgeFromGoalPos) private goalPos: BridgeService<Pos>
    ) { }

    heuristicDistGrid$ = combineLatest([this.gridDimensions.getStream(), this.goalPos.getStream()],
        ({ height, width }, goalPos) => createHeuristicDistFromGoalGrid(height, width, goalPos)
    );
}