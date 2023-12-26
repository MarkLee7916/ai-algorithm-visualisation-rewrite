import { Inject, Injectable } from '@angular/core';
import { combineLatest, map, merge } from 'rxjs';
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
        @Inject('bridgeFromAnimationIndexToAnimationRunning') private bridgeFromAnimationIndex: BridgeService<number>,
        @Inject('bridgeFromAnimationFramesToAnimationindex') private bridgeFromAnimationFrames: BridgeService<AnimationFrame[]>
    ) { }

    getStream() {
        return this.isAnimationRunning$;
    }

    private needToUpdateAnimationFrames$ = this.problemStatementChanges.getStream().pipe(
        map(() => false)
    );

    private isAtFinalFrame$ = combineLatest([this.bridgeFromAnimationIndex.getStream(), this.bridgeFromAnimationFrames.getStream()],
        (index, frames) => index === frames.length - 1
    );

    // Update the animation running flag if the DOM requests it, but also reset it to false if the problem statement changes
    private isAnimationRunning$ = merge(
        this.domUpdates.isAnimationRunning$,
        this.isAtFinalFrame$,
        this.needToUpdateAnimationFrames$
    );
}
