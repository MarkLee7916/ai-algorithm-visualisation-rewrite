import { Inject, Injectable } from '@angular/core';
import { Observable, combineLatest, interval } from 'rxjs';
import { DomUpdatesService } from './dom-updates.service';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { AnimationIndexAction } from '../models/actions/actions';
import { BridgeService } from './bridge';
import { bridgeFromAnimationRunning, bridgeFromAnimate } from '../pathfinding.tokens';

@Injectable({
    providedIn: 'root'
})
export class AnimateService {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(bridgeFromAnimationRunning) private animationRunning: BridgeService<boolean>,
        @Inject(bridgeFromAnimate) private bridgeToOtherStreams: BridgeService<AnimationIndexAction>,
    ) { }

    getStream() {
        return this.animate$;
    }

    /*
        When animation running is set to true, repeatedly emit an increment action with a delay specified by animationDelay$ until 
        it's set to false again
    */
    private animate$: Observable<AnimationIndexAction> = combineLatest([
        this.animationRunning.getStream(),
        this.domUpdates.setAnimationDelay$
    ]).pipe(
        filter(([isAnimationRunning,]) => isAnimationRunning),
        switchMap(([, animationDelay]) =>
            interval(animationDelay).pipe(
                map((): AnimationIndexAction => ({ kind: 'Increment' }))
            )
        ),
        tap(action => this.bridgeToOtherStreams.next(action))
    );
}
