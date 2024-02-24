import { Inject, Injectable } from "@angular/core";
import { Observable, combineLatest, shareReplay, tap } from "rxjs";
import { AlgoToCurrentFrameMapping, AnimationFrame, AnimationFramesForMultipleAlgos, buildAlgoToCurrentFrameMapping } from "../models/animation/animation-frame";
import { BridgeService } from "./bridge";
import { animationIndex, animationFramesForMultipleAlgos, currentAnimationFrameForMultipleAlgos } from "../pathfinding.tokens";
import { StateService } from "./state.service";

@Injectable({
    providedIn: 'root'
})
export class CurrentAnimationFrameForMultipleAlgosService implements StateService<AlgoToCurrentFrameMapping> {
    constructor(
        @Inject(animationIndex) private animationIndex: BridgeService<number>,
        @Inject(animationFramesForMultipleAlgos) private animationFramesForMultipleAlgos: BridgeService<AnimationFramesForMultipleAlgos>,
        @Inject(currentAnimationFrameForMultipleAlgos) bridgeToOtherStreams: BridgeService<AlgoToCurrentFrameMapping>,
    ) {
        bridgeToOtherStreams.link(this.stream$);
    }

    stream$: Observable<AlgoToCurrentFrameMapping> =
        combineLatest([this.animationFramesForMultipleAlgos.stream$, this.animationIndex.stream$],
            (framesForMultipleAlgos, index) => buildAlgoToCurrentFrameMapping(framesForMultipleAlgos.algoToFramesMapping, index)
        ).pipe(
            shareReplay(1)
        );
}
