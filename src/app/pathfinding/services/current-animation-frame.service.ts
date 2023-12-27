import { Inject, Injectable } from "@angular/core";
import { Observable, combineLatest, tap } from "rxjs";
import { AnimationFrame } from "../models/animation/animation-frame";
import { BridgeService } from "./bridge";
import { bridgeFromAnimationIndex, bridgeFromAnimationFrames, bridgeFromCurrentAnimationFrame } from "../pathfinding.tokens";

@Injectable({
    providedIn: 'root'
})
export class CurrentAnimationFrameService {
    constructor(
        @Inject(bridgeFromAnimationIndex) private animationIndex: BridgeService<number>,
        @Inject(bridgeFromAnimationFrames) private animationFrames: BridgeService<AnimationFrame[]>,
        @Inject(bridgeFromCurrentAnimationFrame) private bridgeToOtherStreams: BridgeService<AnimationFrame>,
    ) {
        this.getStream().subscribe()
    }

    getStream() {
        return this.currentAnimationFrame$;
    }

    private currentAnimationFrame$: Observable<AnimationFrame> =
        combineLatest([this.animationFrames.getStream(), this.animationIndex.getStream()],
            (frames, index) => frames[index]
        ).pipe(
            tap(frame => this.bridgeToOtherStreams.next(frame))
        );
}
