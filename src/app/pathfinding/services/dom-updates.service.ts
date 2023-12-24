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
    animationIndexAction$ = new Subject<AnimationIndexAction>();
    isAnimationRunning$ = new BehaviorSubject<boolean>(false);
    animationDelay$ = new BehaviorSubject<number>(1000);
    neighbourVisitOrdering$ = new BehaviorSubject<NeighbourOrdering>(DEFAULT_NEIGHBOUR_VISIT_ORDER);
    pathfindingAlgo$ = new Subject<PathfindingAlgoOption>();
    obstaclePlacedOnTile$ = new Subject<ObstaclePlacedOnTileOption>();
    mazeGenAlgo$ = new Subject<MazeGenAlgoOption>();
    dataDisplayedOnTile$ = new Subject<DataDisplayedOnTileOption>();
    neighboursAllowed$ = new Subject<NeighboursAllowedOption>();
    startPos$ = new Subject<Pos>();
    goalPos$ = new Subject<Pos>();
}
