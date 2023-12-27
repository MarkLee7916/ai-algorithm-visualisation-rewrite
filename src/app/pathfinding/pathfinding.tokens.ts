import { InjectionToken } from "@angular/core";
import { AnimationIndexAction } from "./models/actions/actions";
import { AnimationFrame } from "./models/animation/animation-frame";
import { GridDimensions } from "./models/grid/grid";
import { WeightGrid } from "./models/grid/weight-grid";
import { BridgeService } from "./services/bridge";
import { ProblemStatement } from "./models/problem-statement/problem-statement";
import { BarrierGrid } from "./models/grid/barrier-grid";

export const bridgeFromAnimate = new InjectionToken<BridgeService<AnimationIndexAction>>('bridgeFromAnimate');
export const bridgeFromAnimationFrames = new InjectionToken<BridgeService<AnimationFrame[]>>('bridgeFromAnimationFrames');
export const bridgeFromAnimationIndex = new InjectionToken<BridgeService<number>>('bridgeFromAnimationIndex');
export const bridgeFromAnimationRunning = new InjectionToken<BridgeService<boolean>>('bridgeFromAnimationRunning');
export const bridgeFromCurrentAnimationFrame = new InjectionToken<BridgeService<AnimationFrame>>('bridgeFromCurrentAnimationFrame');
export const bridgeFromGridDimensions = new InjectionToken<BridgeService<GridDimensions>>('bridgeFromGridDimensions');
export const bridgeFromProblemStatementChanges = new InjectionToken<BridgeService<ProblemStatement>>('bridgeFromProblemStatementChanges');
export const bridgeFromWeightGrid = new InjectionToken<BridgeService<WeightGrid>>('bridgeFromWeightGrid');
export const bridgeFromBarrierGrid = new InjectionToken<BridgeService<BarrierGrid>>('bridgeFromBarrierGrid');