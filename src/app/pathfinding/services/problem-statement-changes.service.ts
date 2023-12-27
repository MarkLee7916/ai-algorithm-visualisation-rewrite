import { Inject, Injectable } from '@angular/core';
import { DomUpdatesService } from './dom-updates.service';
import { distinctUntilChanged, map, tap, } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { BridgeService } from './bridge';
import { bridgeFromProblemStatementChanges } from '../pathfinding.tokens';
import { ProblemStatement } from '../models/problem-statement/problem-statement';

@Injectable({
    providedIn: 'root'
})
export class ProblemStatementChangesService {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(bridgeFromProblemStatementChanges) private bridgeToOtherStreams: BridgeService<ProblemStatement>,
    ) { }

    getStream() {
        return this.problemStatementChanges$;
    }

    private problemStatementChanges$: Observable<ProblemStatement> = combineLatest([
        this.domUpdates.setNeighbourVisitOrdering$,
        this.domUpdates.setTypeOfTypeOfNeighboursAllowed$,
        this.domUpdates.setPathfindingAlgo$,
    ]).pipe(
        map(() => [] as unknown as ProblemStatement),
        distinctUntilChanged(),
        tap(problemStatement => this.bridgeToOtherStreams.next(problemStatement))
    );
}
