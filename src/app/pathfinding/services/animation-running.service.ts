import { Inject, Injectable } from '@angular/core';
import { combineLatest, distinctUntilChanged, filter, map, merge, shareReplay, tap } from 'rxjs';
import { DomUpdatesService } from './dom-updates.service';
import { BridgeService } from './bridge';
import { AnimationFrame, AnimationFramesForMultipleAlgos } from '../models/animation/animation-frame';
import { animationIndex, animationFramesForMultipleAlgos, animationRunning, problemStatementChanges } from '../pathfinding.tokens';
import { ProblemStatement } from '../models/problem-statement/problem-statement';
import { StateService } from './state.service';

@Injectable({
    providedIn: 'root'
})
export class AnimationRunningService implements StateService<boolean> {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(problemStatementChanges) private problemStatementChanges: BridgeService<ProblemStatement>,
        @Inject(animationIndex) private animationIndex: BridgeService<number>,
        @Inject(animationFramesForMultipleAlgos) private animationFramesForMultipleAlgos: BridgeService<AnimationFramesForMultipleAlgos>,
        @Inject(animationRunning) bridgeToOtherStreams: BridgeService<boolean>,
    ) {
        bridgeToOtherStreams.link(this.stream$);
    }

    private stopIfNeedToUpdateFrames$ = this.problemStatementChanges.stream$.pipe(
        map(() => false)
    );

    private stopIfAtFinalFrame$ = combineLatest([
        this.animationIndex.stream$,
        this.animationFramesForMultipleAlgos.stream$
    ]).pipe(
        filter(([index, framesForMultipleAlgos]) => index === framesForMultipleAlgos.lengthOfFramesForEachAlgo - 1),
        map(() => false)
    );

    stream$ = merge(
        this.domUpdates.setAnimationRunning$,
        this.stopIfAtFinalFrame$,
        this.stopIfNeedToUpdateFrames$
    ).pipe(
        distinctUntilChanged(),
        shareReplay(1)
    );
}
