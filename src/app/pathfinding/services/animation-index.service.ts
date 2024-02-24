import { Inject, Injectable } from "@angular/core";
import { Observable, merge, map, scan, withLatestFrom, tap, filter, distinctUntilChanged, shareReplay } from "rxjs";
import { AnimationIndexAction } from "../models/actions/actions";
import { DomUpdatesService } from "./dom-updates.service";
import { BridgeService } from "./bridge";
import { AnimationFrame } from "../models/animation/animation-frame";
import { problemStatementChanges, animate, animationFrames, animationIndex, animationRunning } from "../pathfinding.tokens";
import { ProblemStatement } from "../models/problem-statement/problem-statement";
import { StateService } from "./state.service";

@Injectable({
    providedIn: 'root'
})
export class AnimationIndexService implements StateService<number> {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(problemStatementChanges) private problemStatementChanges: BridgeService<ProblemStatement>,
        @Inject(animate) private animate: BridgeService<AnimationIndexAction>,
        @Inject(animationFrames) private animationFrames: BridgeService<AnimationFrame[]>,
        @Inject(animationRunning) private animationRunning: BridgeService<boolean>,
        @Inject(animationIndex) bridgeToOtherStreams: BridgeService<number>
    ) {
        bridgeToOtherStreams.link(this.stream$);
    }

    private resetAnimationIndexAsProblemStatementChanged$ = this.problemStatementChanges.stream$.pipe(
        map((): AnimationIndexAction => ({ kind: 'Reset' }))
    );

    private resetAnimationIndexWhenUserRunsAlgorithmWhenOnFinalFrame$ = this.animationRunning.stream$.pipe(
        filter(isRunning => isRunning),
        withLatestFrom(this.animationFrames.stream$),
        map(([, frames]): AnimationIndexAction => ({ kind: 'ResetIfIndexAt', indexToResetAt: frames.length - 1 }))
    );

    stream$: Observable<number> =
        merge(
            this.animate.stream$,
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
            withLatestFrom(this.animationFrames.stream$),
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
            shareReplay(1),
        );
}
