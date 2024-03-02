import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { PathfindingRoutingModule } from "./pathfinding-routing-module";
import { PageComponent } from "./components/page/page.component";
import { BridgeService } from "./services/bridge";
import { AlgoToCurrentFrameMapping, AnimationFrame, AnimationFramesForMultipleAlgos } from "./models/animation/animation-frame";
import { AnimationIndexAction } from "./models/actions/actions";
import { GridDimensions } from "./models/grid/grid";
import { WeightGrid } from "./models/grid/weight-grid";
import { animate, animationFramesForMultipleAlgos, animationIndex, animationRunning, barrierGrid, currentAnimationFrameForMultipleAlgos, goalPos, gridDimensions, problemStatementChanges, startPos, weightGrid, heuristicDistGrid, lastPosDraggedFrom, mousePress, pathfindingAlgos } from "./pathfinding.tokens";
import { ProblemStatement } from "./models/problem-statement/problem-statement";
import { BarrierGrid } from "./models/grid/barrier-grid";
import { Pos } from "./models/grid/pos";
import { TileComponent } from "./components/tile/tile.component";
import { GridComponent } from "./components/grid/grid.component";
import { HeuristicDistFromGoalGrid } from "./models/grid/heuristic-dist-from-goal-grid";
import { PathfindingAlgoOption } from "./models/dropdown/dropdown-enums";
import { FormatPathLengthPipe } from "./pipes/format-path-length.pipe";

@NgModule({
  declarations: [PageComponent, GridComponent, TileComponent, FormatPathLengthPipe],
  imports: [
    CommonModule,
    BrowserModule,
    PathfindingRoutingModule,
  ],
  providers: [
    { provide: animate, useClass: BridgeService<AnimationIndexAction> },
    { provide: animationFramesForMultipleAlgos, useClass: BridgeService<AnimationFramesForMultipleAlgos> },
    { provide: animationIndex, useClass: BridgeService<number> },
    { provide: animationRunning, useClass: BridgeService<boolean> },
    { provide: currentAnimationFrameForMultipleAlgos, useClass: BridgeService<AlgoToCurrentFrameMapping> },
    { provide: gridDimensions, useClass: BridgeService<GridDimensions> },
    { provide: problemStatementChanges, useClass: BridgeService<ProblemStatement> },
    { provide: weightGrid, useClass: BridgeService<WeightGrid> },
    { provide: barrierGrid, useClass: BridgeService<BarrierGrid> },
    { provide: startPos, useClass: BridgeService<Pos> },
    { provide: goalPos, useClass: BridgeService<Pos> },
    { provide: lastPosDraggedFrom, useClass: BridgeService<Pos | null> },
    { provide: heuristicDistGrid, useClass: BridgeService<HeuristicDistFromGoalGrid> },
    { provide: mousePress, useClass: BridgeService<boolean> },
    { provide: pathfindingAlgos, useClass: BridgeService<PathfindingAlgoOption[]> },
  ]
})
export class PathfindingModule { }
