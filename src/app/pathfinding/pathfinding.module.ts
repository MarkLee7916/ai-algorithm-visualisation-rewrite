import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { PathfindingRoutingModule } from "./pathfinding-routing-module";
import { PageComponent } from "./components/page/page.component";
import { BridgeService } from "./services/bridge";
import { AnimationFrame } from "./models/animation/animation-frame";
import { AnimationIndexAction } from "./models/actions/actions";
import { GridDimensions } from "./models/grid/grid";
import { WeightGrid } from "./models/grid/weight-grid";
import { bridgeFromAnimate, bridgeFromAnimationFrames, bridgeFromAnimationIndex, bridgeFromAnimationRunning, bridgeFromBarrierGrid, bridgeFromCurrentAnimationFrame, bridgeFromGoalPos, bridgeFromGridDimensions, bridgeFromProblemStatementChanges, bridgeFromStartPos, bridgeFromWeightGrid } from "./pathfinding.tokens";
import { ProblemStatement } from "./models/problem-statement/problem-statement";
import { BarrierGrid } from "./models/grid/barrier-grid";
import { Pos } from "./models/grid/pos";
import { TileComponent } from "./components/tile/tile.component";
import { GridComponent } from "./components/grid/grid.component";

@NgModule({
  declarations: [PageComponent, GridComponent, TileComponent],
  imports: [
    CommonModule,
    BrowserModule,
    PathfindingRoutingModule,
  ],
  providers: [
    { provide: bridgeFromAnimate, useClass: BridgeService<AnimationIndexAction> },
    { provide: bridgeFromAnimationFrames, useClass: BridgeService<AnimationFrame[]> },
    { provide: bridgeFromAnimationIndex, useClass: BridgeService<number> },
    { provide: bridgeFromAnimationRunning, useClass: BridgeService<boolean> },
    { provide: bridgeFromCurrentAnimationFrame, useClass: BridgeService<AnimationFrame> },
    { provide: bridgeFromGridDimensions, useClass: BridgeService<GridDimensions> },
    { provide: bridgeFromProblemStatementChanges, useClass: BridgeService<ProblemStatement> },
    { provide: bridgeFromWeightGrid, useClass: BridgeService<WeightGrid> },
    { provide: bridgeFromBarrierGrid, useClass: BridgeService<BarrierGrid> },
    { provide: bridgeFromStartPos, useClass: BridgeService<Pos> },
    { provide: bridgeFromGoalPos, useClass: BridgeService<Pos> },
  ]
})
export class PathfindingModule { }
