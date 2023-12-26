import { Inject, Injectable } from '@angular/core';
import { combineLatest, filter, map, merge } from 'rxjs';
import { DomUpdatesService } from './dom-updates.service';
import { ProblemStatementChangesService } from './problem-statement-changes.service';
import { BridgeService } from './bridge';
import { AnimationFrame } from '../models/animation/animation-frame';

@Injectable({
    providedIn: 'root'
})
export class AnimationRunningService {
    constructor(
        private domUpdates: DomUpdatesService,
        private problemStatementChanges: ProblemStatementChangesService,
        @Inject('bridgeFromAnimationIndex') private bridgeFromAnimationIndex: BridgeService<number>,
        @Inject('bridgeFromAnimationFrames') private bridgeFromAnimationFrames: BridgeService<AnimationFrame[]>
    ) { }

    getStream() {
        return this.isAnimationRunning$;
    }

    private stopIfNeedToUpdateFrames$ = this.problemStatementChanges.getStream().pipe(
        map(() => false)
    );

    private stopIfAtFinalFrame$ = combineLatest([
        this.bridgeFromAnimationIndex.getStream(),
        this.bridgeFromAnimationFrames.getStream()
    ]).pipe(
        filter(([index, frames]) => index === frames.length - 1),
        map(() => false)
    );

    // Update the animation running flag if the DOM requests it, but also reset it to false if the problem statement changes
    private isAnimationRunning$ = merge(
        this.domUpdates.setAnimationRunning$,
        this.stopIfAtFinalFrame$,
        this.stopIfNeedToUpdateFrames$
    );
}
