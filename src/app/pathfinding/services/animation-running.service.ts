import { Inject, Injectable } from '@angular/core';
import { combineLatest, distinctUntilChanged, filter, map, merge, tap } from 'rxjs';
import { DomUpdatesService } from './dom-updates.service';
import { BridgeService } from './bridge';
import { AnimationFrame } from '../models/animation/animation-frame';
import { bridgeFromAnimationIndex, bridgeFromAnimationFrames, bridgeFromAnimationRunning, bridgeFromProblemStatementChanges } from '../pathfinding.tokens';
import { ProblemStatement } from '../models/problem-statement/problem-statement';
import { StateService } from './state.service';

@Injectable({
    providedIn: 'root'
})
export class AnimationRunningService implements StateService<boolean> {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(bridgeFromProblemStatementChanges) private problemStatementChanges: BridgeService<ProblemStatement>,
        @Inject(bridgeFromAnimationIndex) private animationIndex: BridgeService<number>,
        @Inject(bridgeFromAnimationFrames) private animationFrames: BridgeService<AnimationFrame[]>,
        @Inject(bridgeFromAnimationRunning) bridgeToOtherStreams: BridgeService<boolean>,
    ) {
        bridgeToOtherStreams.link(this.getStream());
    }

    getStream() {
        return this.isAnimationRunning$;
    }

    private stopIfNeedToUpdateFrames$ = this.problemStatementChanges.getStream().pipe(
        map(() => false)
    );

    private stopIfAtFinalFrame$ = combineLatest([
        this.animationIndex.getStream(),
        this.animationFrames.getStream()
    ]).pipe(
        filter(([index, frames]) => index === frames.length - 1),
        map(() => false)
    );

    // Update the animation running flag if the DOM requests it, but also reset it to false if the problem statement changes
    private isAnimationRunning$ = merge(
        this.domUpdates.setAnimationRunning$,
        this.stopIfAtFinalFrame$,
        this.stopIfNeedToUpdateFrames$
    ).pipe(
        distinctUntilChanged()
    );
}
