import { Inject, Injectable } from "@angular/core";
import { Observable, combineLatest, tap } from "rxjs";
import { AnimationFrame } from "../models/animation/animation-frame";
import { BridgeService } from "./bridge";
import { bridgeFromAnimationIndex, bridgeFromAnimationFrames, bridgeFromCurrentAnimationFrame } from "../pathfinding.tokens";
import { StateService } from "./state.service";

@Injectable({
    providedIn: 'root'
})
export class CurrentAnimationFrameService implements StateService<AnimationFrame> {
    constructor(
        @Inject(bridgeFromAnimationIndex) private animationIndex: BridgeService<number>,
        @Inject(bridgeFromAnimationFrames) private animationFrames: BridgeService<AnimationFrame[]>,
        @Inject(bridgeFromCurrentAnimationFrame) bridgeToOtherStreams: BridgeService<AnimationFrame>,
    ) {
        bridgeToOtherStreams.link(this.getStream());
    }

    getStream() {
        return this.currentAnimationFrame$;
    }

    private currentAnimationFrame$: Observable<AnimationFrame> =
        combineLatest([this.animationFrames.getStream(), this.animationIndex.getStream()],
            (frames, index) => frames[index]
        );
}
