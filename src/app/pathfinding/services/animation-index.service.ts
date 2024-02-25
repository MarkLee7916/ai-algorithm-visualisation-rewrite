import { Inject, Injectable } from "@angular/core";
import { Observable, merge, map, scan, withLatestFrom, tap, filter, distinctUntilChanged, shareReplay } from "rxjs";
import { AnimationIndexAction } from "../models/actions/actions";
import { DomUpdatesService } from "./dom-updates.service";
import { BridgeService } from "./bridge";
import { AnimationFrame, AnimationFramesForMultipleAlgos } from "../models/animation/animation-frame";
import { problemStatementChanges, animate, animationFramesForMultipleAlgos, animationIndex, animationRunning } from "../pathfinding.tokens";
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
        @Inject(animationFramesForMultipleAlgos) private animationFramesForMultipleAlgos: BridgeService<AnimationFramesForMultipleAlgos>,
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
        withLatestFrom(this.animationFramesForMultipleAlgos.stream$),
        map(([, framesForMultipleAlgos]): AnimationIndexAction => ({ kind: 'ResetIfIndexAt', indexToResetAt: framesForMultipleAlgos.lengthOfFramesForEachAlgo - 1 }))
    );

    stream$: Observable<number> =
        merge(
            this.animate.stream$,
            this.domUpdates.newAnimationIndexAction$,
            this.resetAnimationIndexAsProblemStatementChanged$,
            this.resetAnimationIndexWhenUserRunsAlgorithmWhenOnFinalFrame$
        ).pipe(
            withLatestFrom(this.animationFramesForMultipleAlgos.stream$),
            scan((currentIndex, [action, framesForMultipleAlgos]) => {
                let newIndex = currentIndex;

                if (action.kind === 'Increment') {
                    newIndex = currentIndex + 1;
                } else if (action.kind === 'Decrement') {
                    newIndex = currentIndex - 1;
                } else if (action.kind === 'Reset') {
                    newIndex = 0;
                } else if (action.kind === 'SetValue') {
                    newIndex = action.valueToSetTo;
                } else if (action.kind === 'ResetIfIndexAt') {
                    newIndex = currentIndex === action.indexToResetAt ? 0 : currentIndex;
                }

                if (newIndex < 0) {
                    return 0;
                } else if (newIndex >= framesForMultipleAlgos.lengthOfFramesForEachAlgo) {
                    return framesForMultipleAlgos.lengthOfFramesForEachAlgo - 1
                } else {
                    return newIndex;
                }
            }, 0),
            distinctUntilChanged(),
            shareReplay(1),
        );
}
