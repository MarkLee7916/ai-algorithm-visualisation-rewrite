import { Inject, Injectable } from '@angular/core';
import { Observable, combineLatest, interval } from 'rxjs';
import { DomUpdatesService } from './dom-updates.service';
import { map, shareReplay, switchMap, takeWhile, tap } from 'rxjs/operators';
import { AnimationIndexAction } from '../models/actions/actions';
import { BridgeService } from './bridge';
import { animationRunning, animate } from '../pathfinding.tokens';
import { StateService } from './state.service';

@Injectable({
    providedIn: 'root'
})
export class AnimateService implements StateService<AnimationIndexAction> {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(animationRunning) private animationRunning: BridgeService<boolean>,
        @Inject(animate) bridgeToOtherStreams: BridgeService<AnimationIndexAction>,
    ) {
        bridgeToOtherStreams.link(this.stream$);
    }

    /*
        When animation running is set to true, repeatedly emit an increment action with a delay specified by animationDelay$ until 
        it's set to false again
    */
    stream$: Observable<AnimationIndexAction> = combineLatest([
        this.animationRunning.stream$,
        this.domUpdates.setAnimationDelay$
    ]).pipe(
        switchMap(([isAnimationRunning, animationDelay]) =>
            interval(animationDelay).pipe(
                map((): AnimationIndexAction => ({ kind: 'Increment' })),
                takeWhile(() => isAnimationRunning),
                shareReplay(1)
            )
        )
    );
}
