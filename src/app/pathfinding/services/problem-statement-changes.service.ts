import { Inject, Injectable } from '@angular/core';
import { DomUpdatesService } from './dom-updates.service';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { BridgeService } from './bridge';
import { bridgeFromBarrierGrid, bridgeFromGoalPos, bridgeFromProblemStatementChanges, bridgeFromStartPos, bridgeFromWeightGrid } from '../pathfinding.tokens';
import { ProblemStatement } from '../models/problem-statement/problem-statement';
import { WeightGrid } from '../models/grid/weight-grid';
import { BarrierGrid } from '../models/grid/barrier-grid';
import { Pos } from '../models/grid/pos';

@Injectable({
    providedIn: 'root'
})
export class ProblemStatementChangesService {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(bridgeFromBarrierGrid) private barrierGrid: BridgeService<BarrierGrid>,
        @Inject(bridgeFromWeightGrid) private weightGrid: BridgeService<WeightGrid>,
        @Inject(bridgeFromStartPos) private startPos: BridgeService<Pos>,
        @Inject(bridgeFromGoalPos) private goalPos: BridgeService<Pos>,
        @Inject(bridgeFromProblemStatementChanges) private bridgeToOtherStreams: BridgeService<ProblemStatement>,
    ) { }

    getStream() {
        return this.problemStatementChanges$;
    }

    private problemStatementChanges$: Observable<ProblemStatement> = combineLatest([
        this.domUpdates.setNeighbourVisitOrdering$,
        this.domUpdates.setTypeOfNeighboursAllowed$,
        this.domUpdates.setPathfindingAlgo$,
        this.weightGrid.getStream(),
        this.barrierGrid.getStream(),
        this.startPos.getStream(),
        this.goalPos.getStream()
    ]).pipe(
        distinctUntilChanged(),
        tap(problemStatement => this.bridgeToOtherStreams.next(problemStatement))
    );
}
