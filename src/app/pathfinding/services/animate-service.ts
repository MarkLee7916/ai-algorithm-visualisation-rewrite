import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { DomUpdatesService } from './dom-updates.service';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AnimationIndexAction } from '../models/actions/actions';
import { AnimationRunningService } from './animation-running.service';

@Injectable({
    providedIn: 'root'
})
export class AnimateService {
    constructor(
        private domUpdates: DomUpdatesService,
        private animationRunning: AnimationRunningService,
    ) { }

    getStream() {
        return this.animate$;
    }

    /*
        When animation running is set to true, repeatedly emit an increment action with a delay specified by animationDelay$ until 
        it's set to false again
    */
    private animate$: Observable<AnimationIndexAction> = this.animationRunning.getStream().pipe(
        filter(isAnimationRunning => isAnimationRunning),
        withLatestFrom(this.domUpdates.animationDelay$),
        switchMap(([, animationDelay]) =>
            interval(animationDelay).pipe(
                map((): AnimationIndexAction => ({ kind: 'Increment' }))
            )
        )
    );
}
