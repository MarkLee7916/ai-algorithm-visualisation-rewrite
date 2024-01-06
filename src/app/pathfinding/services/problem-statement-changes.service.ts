import { Inject, Injectable } from '@angular/core';
import { DomUpdatesService } from './dom-updates.service';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { BridgeService } from './bridge';
import { barrierGrid, goalPos, problemStatementChanges, startPos, weightGrid } from '../pathfinding.tokens';
import { ProblemStatement } from '../models/problem-statement/problem-statement';
import { WeightGrid } from '../models/grid/weight-grid';
import { BarrierGrid } from '../models/grid/barrier-grid';
import { Pos } from '../models/grid/pos';
import { StateService } from './state.service';

@Injectable({
    providedIn: 'root'
})
export class ProblemStatementChangesService implements StateService<ProblemStatement> {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(barrierGrid) private barrierGrid: BridgeService<BarrierGrid>,
        @Inject(weightGrid) private weightGrid: BridgeService<WeightGrid>,
        @Inject(startPos) private startPos: BridgeService<Pos>,
        @Inject(goalPos) private goalPos: BridgeService<Pos>,
        @Inject(problemStatementChanges) bridgeToOtherStreams: BridgeService<ProblemStatement>,
    ) {
        bridgeToOtherStreams.link(this.getStream());
    }

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
    ]);
}
