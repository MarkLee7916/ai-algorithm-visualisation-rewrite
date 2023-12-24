import { Injectable } from '@angular/core';
import { map, merge } from 'rxjs';
import { DomUpdatesService } from './dom-updates.service';
import { ProblemStatementChangesService } from './problem-statement-changes.service';

@Injectable({
    providedIn: 'root'
})
export class AnimationRunningService {
    constructor(
        private domUpdates: DomUpdatesService,
        private problemStatementChanges: ProblemStatementChangesService
    ) { }

    getStream() {
        return this.isAnimationRunning$;
    }

    // Update the animation running flag if the DOM requests it, but also reset it to false if the problem statement changes
    private isAnimationRunning$ = merge(
        this.domUpdates.isAnimationRunning$,
        this.problemStatementChanges.getStream().pipe(
            map(() => false)
        )
    );
}
