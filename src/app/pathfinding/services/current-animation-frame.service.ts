import { Injectable } from "@angular/core";
import { Observable, combineLatest } from "rxjs";
import { AnimationFrame } from "../models/animation/animation-frame";
import { DomUpdatesService } from "./dom-updates.service";
import { AnimationIndexService } from "./animation-index.service";
import { AnimationFramesService } from "./animation.frames.service";

@Injectable({
    providedIn: 'root'
})
export class CurrentAnimationFrameService {
    constructor(
        private animationIndex: AnimationIndexService,
        private animationFrames: AnimationFramesService,
    ) { }

    getStream() {
        return this.currentAnimationFrame$;
    }

    // Stream the current animation frame, handling the logic of the index being out of bounds
    private currentAnimationFrame$: Observable<AnimationFrame> =
        combineLatest([this.animationFrames.getStream(), this.animationIndex.getStream()], (frames, index) => {
            if (index < 0) {
                return frames[0];
            } else if (index >= frames.length) {
                return frames[frames.length - 1];
            } else {
                return frames[index];
            }
        });
}
