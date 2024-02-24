import { InjectionToken } from "@angular/core";
import { AnimationIndexAction } from "./models/actions/actions";
import { AnimationFrame, AnimationFramesForMultipleAlgos, AlgoToCurrentFrameMapping } from "./models/animation/animation-frame";
import { GridDimensions } from "./models/grid/grid";
import { WeightGrid } from "./models/grid/weight-grid";
import { BridgeService } from "./services/bridge";
import { ProblemStatement } from "./models/problem-statement/problem-statement";
import { BarrierGrid } from "./models/grid/barrier-grid";
import { Pos } from "./models/grid/pos";
import { HeuristicDistFromGoalGrid } from "./models/grid/heuristic-dist-from-goal-grid";

export const animate = new InjectionToken<BridgeService<AnimationIndexAction>>('animate');
export const animationFramesForMultipleAlgos = new InjectionToken<BridgeService<AnimationFramesForMultipleAlgos>>('animationFramesForMultipleAlgos');
export const animationIndex = new InjectionToken<BridgeService<number>>('animationIndex');
export const animationRunning = new InjectionToken<BridgeService<boolean>>('animationRunning');
export const currentAnimationFrameForMultipleAlgos = new InjectionToken<BridgeService<AlgoToCurrentFrameMapping>>('currentAnimationFrameForMultipleAlgos');
export const gridDimensions = new InjectionToken<BridgeService<GridDimensions>>('gridDimensions');
export const problemStatementChanges = new InjectionToken<BridgeService<ProblemStatement>>('problemStatementChanges');
export const weightGrid = new InjectionToken<BridgeService<WeightGrid>>('weightGrid');
export const barrierGrid = new InjectionToken<BridgeService<BarrierGrid>>('barrierGrid');
export const startPos = new InjectionToken<BridgeService<Pos>>('startPos');
export const goalPos = new InjectionToken<BridgeService<Pos>>('goalPos');
export const heuristicDistGrid = new InjectionToken<BridgeService<HeuristicDistFromGoalGrid>>('heuristicDistGrid');
export const lastPosDraggedFrom = new InjectionToken<BridgeService<Pos | null>>('lastPosDraggedFrom');
export const mousePress = new InjectionToken<BridgeService<boolean>>('mousePress');