import { Inject, Injectable } from "@angular/core";
import { Observable, combineLatest, shareReplay, tap } from "rxjs";
import { AnimationFrame } from "../models/animation/animation-frame";
import { BridgeService } from "./bridge";
import { animationIndex, animationFrames, currentAnimationFrame } from "../pathfinding.tokens";
import { StateService } from "./state.service";

@Injectable({
    providedIn: 'root'
})
export class CurrentAnimationFrameService implements StateService<AnimationFrame> {
    constructor(
        @Inject(animationIndex) private animationIndex: BridgeService<number>,
        @Inject(animationFrames) private animationFrames: BridgeService<AnimationFrame[]>,
        @Inject(currentAnimationFrame) bridgeToOtherStreams: BridgeService<AnimationFrame>,
    ) {
        bridgeToOtherStreams.link(this.stream$);
    }

    stream$: Observable<AnimationFrame> =
        combineLatest([this.animationFrames.stream$, this.animationIndex.stream$],
            (frames, index) => frames[index]
        ).pipe(
            shareReplay(1)
        );
}
