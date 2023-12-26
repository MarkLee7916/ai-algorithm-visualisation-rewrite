import { Injectable } from '@angular/core';
import { DomUpdatesService } from './dom-updates.service';
import { distinctUntilChanged, } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { NeighboursAllowedOption, PathfindingAlgoOption } from '../models/dropdown/dropdown-enums';
import { BarrierGrid } from '../models/grid/barrier-grid';
import { NeighbourOrdering } from '../models/grid/neighbours';
import { Pos } from '../models/grid/pos';
import { WeightGrid } from '../models/grid/weight-grid';

@Injectable({
    providedIn: 'root'
})
export class ProblemStatementChangesService {
    constructor(
        private domUpdates: DomUpdatesService,
    ) { }

    getStream() {
        return this.problemStatementChanges$;
    }

    private problemStatementChanges$: Observable<ProblemStatement> = combineLatest([
        this.domUpdates.setNeighbourVisitOrdering$,
        this.domUpdates.changeTypeOfNeighboursAllowed$,
        this.domUpdates.setPathfindingAlgo$,
    ]).pipe(
        distinctUntilChanged()
    );
}

export type ProblemStatement = [
    NeighbourOrdering,
    NeighboursAllowedOption,
    PathfindingAlgoOption,
    WeightGrid,
    BarrierGrid,
    Pos,
    Pos
];
