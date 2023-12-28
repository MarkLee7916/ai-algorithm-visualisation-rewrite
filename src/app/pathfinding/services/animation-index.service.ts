import { Inject, Injectable } from "@angular/core";
import { Observable, merge, map, scan, withLatestFrom, tap, filter, distinctUntilChanged } from "rxjs";
import { AnimationIndexAction } from "../models/actions/actions";
import { DomUpdatesService } from "./dom-updates.service";
import { BridgeService } from "./bridge";
import { AnimationFrame } from "../models/animation/animation-frame";
import { bridgeFromProblemStatementChanges, bridgeFromAnimate, bridgeFromAnimationFrames, bridgeFromAnimationIndex, bridgeFromAnimationRunning } from "../pathfinding.tokens";
import { ProblemStatement } from "../models/problem-statement/problem-statement";

@Injectable({
    providedIn: 'root'
})
export class AnimationIndexService {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(bridgeFromProblemStatementChanges) private problemStatementChanges: BridgeService<ProblemStatement>,
        @Inject(bridgeFromAnimate) private animate: BridgeService<AnimationIndexAction>,
        @Inject(bridgeFromAnimationFrames) private animationFrames: BridgeService<AnimationFrame[]>,
        @Inject(bridgeFromAnimationRunning) private animationRunning: BridgeService<boolean>,
        @Inject(bridgeFromAnimationIndex) private bridgeToOtherStreams: BridgeService<number>
    ) {
        this.getStream().subscribe();
    }

    getStream() {
        return this.animationIndex$;
    }

    private resetAnimationIndexAsProblemStatementChanged$ = this.problemStatementChanges.getStream().pipe(
        map((): AnimationIndexAction => ({ kind: 'Reset' }))
    );

    private resetAnimationIndexWhenUserRunsAlgorithmWhenOnFinalFrame$ = this.animationRunning.getStream().pipe(
        filter(isRunning => isRunning),
        withLatestFrom(this.animationFrames.getStream()),
        map(([, frames]): AnimationIndexAction => ({ kind: 'ResetIfIndexAt', indexToResetAt: frames.length - 1 }))
    );

    // Animation index updates when either an event requests it or the problem statement changes
    private animationIndex$: Observable<number> =
        merge(
            this.animate.getStream(),
            this.domUpdates.newAnimationIndexAction$,
            this.resetAnimationIndexAsProblemStatementChanged$,
            this.resetAnimationIndexWhenUserRunsAlgorithmWhenOnFinalFrame$
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
                } else if (action.kind === 'ResetIfIndexAt') {
                    return currentIndex === action.indexToResetAt ? 0 : currentIndex;
                } else {
                    throw new Error('Unexpected action kind');
                }
            }, 0),
            withLatestFrom(this.animationFrames.getStream()),
            map(([index, frames]) => {
                if (index < 0) {
                    return 0;
                } else if (index >= frames.length) {
                    return frames.length - 1
                } else {
                    return index;
                }
            }),
            distinctUntilChanged(),
            tap(index => this.bridgeToOtherStreams.next(index)),
        );
}
