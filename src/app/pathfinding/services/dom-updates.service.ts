import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AnimationIndexAction } from '../models/actions/actions';
import { PathfindingAlgoOption, ObstaclePlacedOnTileOption, MazeGenAlgoOption, DataDisplayedOnTileOption, NeighboursAllowedOption } from '../models/dropdown/dropdown-enums';
import { NeighbourOrdering, DEFAULT_NEIGHBOUR_VISIT_ORDER } from '../models/grid/neighbours';
import { Pos } from '../models/grid/pos';

@Injectable({
    providedIn: 'root'
})
export class DomUpdatesService {
    newAnimationIndexAction$ = new Subject<AnimationIndexAction>();
    setAnimationRunning$ = new BehaviorSubject<boolean>(false);
    setAnimationDelay$ = new BehaviorSubject<number>(1000);
    setNeighbourVisitOrdering$ = new BehaviorSubject<NeighbourOrdering>(DEFAULT_NEIGHBOUR_VISIT_ORDER);
    setPathfindingAlgo$ = new Subject<PathfindingAlgoOption>();
    setObstaclePlacedOnTile$ = new Subject<ObstaclePlacedOnTileOption>();
    setMazeGenAlgo$ = new Subject<MazeGenAlgoOption>();
    changeTypeOfDataDisplayedOnTile$ = new Subject<DataDisplayedOnTileOption>();
    changeTypeOfNeighboursAllowed$ = new Subject<NeighboursAllowedOption>();
    setStartPos$ = new Subject<Pos>();
    setGoalPos$ = new Subject<Pos>();
}
