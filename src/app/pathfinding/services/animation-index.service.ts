import { Inject, Injectable } from "@angular/core";
import { Observable, merge, map, scan, withLatestFrom, tap } from "rxjs";
import { AnimationIndexAction } from "../models/actions/actions";
import { DomUpdatesService } from "./dom-updates.service";
import { ProblemStatementChangesService } from "./problem-statement-changes.service";
import { AnimateService } from "./animate-service";
import { BridgeService } from "./bridge";
import { AnimationFrame } from "../models/animation/animation-frame";

@Injectable({
    providedIn: 'root'
})
export class AnimationIndexService {
    constructor(
        private domUpdates: DomUpdatesService,
        private problemStatementChanges: ProblemStatementChangesService,
        private animate: AnimateService,
        @Inject('bridgeFromAnimationFramesToAnimationindex') private bridgeFromAnimationFrames: BridgeService<AnimationFrame[]>,
        @Inject('bridgeFromAnimationIndexToAnimationRunning') private bridgeToAnimationRunning: BridgeService<number>
    ) { }

    getStream() {
        return this.animationIndex$;
    }

    // Animation index updates when either an event requests it or the problem statement changes
    private animationIndex$: Observable<number> =
        merge(
            this.animate.getStream(),
            this.domUpdates.animationIndexAction$,
            this.problemStatementChanges.getStream().pipe(
                map((): AnimationIndexAction => ({ kind: 'Reset' }))
            )
        ).pipe(
            scan((currentIndex, action) => {
                if (action.kind === 'Increment') {
                    return currentIndex + 1;
                } else if (action.kind === 'Decrement') {
                    return currentIndex - 1;
                } else if (action.kind === 'Reset') {
                    return 0;
                } else if (action.kind === 'SetValue') {
                    return action.valueToSetTo;
                } else {
                    throw new Error('Unexpected action kind');
                }
            }, 0),
            withLatestFrom(this.bridgeFromAnimationFrames.getStream()),
            map(([index, frames]) => {
                if (index < 0) {
                    return 0;
                } else if (index >= frames.length) {
                    return frames.length - 1
                } else {
                    return index;
                }
            }),
            tap(index => this.bridgeToAnimationRunning.next(index)),
        );
}
