import { Inject, Injectable } from '@angular/core';
import { DomUpdatesService } from './dom-updates.service';
import { shareReplay } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { BridgeService } from './bridge';
import { barrierGrid, goalPos, gridDimensions, pathfindingAlgos, problemStatementChanges, startPos, weightGrid } from '../pathfinding.tokens';
import { ProblemStatement } from '../models/problem-statement/problem-statement';
import { WeightGrid } from '../models/grid/weight-grid';
import { BarrierGrid } from '../models/grid/barrier-grid';
import { Pos } from '../models/grid/pos';
import { StateService } from './state.service';
import { GridDimensions } from '../models/grid/grid';
import { PathfindingAlgoOption } from '../models/dropdown/dropdown-enums';

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
        @Inject(gridDimensions) private gridDimensions: BridgeService<GridDimensions>,
        @Inject(pathfindingAlgos) private pathfindingAlgos: BridgeService<PathfindingAlgoOption[]>,
        @Inject(problemStatementChanges) bridgeToOtherStreams: BridgeService<ProblemStatement>,
    ) {
        bridgeToOtherStreams.link(this.stream$);
    }

    stream$: Observable<ProblemStatement> = combineLatest([
        this.domUpdates.neighbourVisitOrdering$,
        this.domUpdates.typeOfNeighboursAllowed$,
        this.pathfindingAlgos.stream$,
        this.weightGrid.stream$,
        this.barrierGrid.stream$,
        this.startPos.stream$,
        this.goalPos.stream$,
        this.gridDimensions.stream$
    ]).pipe(
        shareReplay(1)
    );
}
