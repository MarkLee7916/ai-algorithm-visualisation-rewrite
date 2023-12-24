import { Injectable } from "@angular/core";
import { Observable, merge, map, scan } from "rxjs";
import { AnimationIndexAction } from "../models/actions/actions";
import { AnimationRunningService } from "./animation-running.service";
import { DomUpdatesService } from "./dom-updates.service";
import { ProblemStatementChangesService } from "./problem-statement-changes.service";
import { AnimateService } from "./animate-service";

@Injectable({
    providedIn: 'root'
})
export class AnimationIndexService {
    constructor(
        private domUpdates: DomUpdatesService,
        private problemStatementChanges: ProblemStatementChangesService,
        private animate: AnimateService,
    ) { }

    getStream() {
        return this.animationIndex$;
    }

    // Animation index updates when either an event requests it or the problem statement changes
    private animationIndex$: Observable<number> =
        merge(
            this.animate.getStream(),
            this.domUpdates.animationIndexAction$,
            this.problemStatementChanges.getStream().pipe(
                map((): AnimationIndexAction => ({ kind: 'Reset' }))
            )
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
                } else {
                    throw new Error('Unexpected action kind');
                }
            }, 0),
        );
}
