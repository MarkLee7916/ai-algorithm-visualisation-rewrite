import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { AnimationIndexAction, PathfindingAlgosAction } from '../models/actions/actions';
import { PathfindingAlgoOption, ObstaclePlacedOnTileOption, MazeGenAlgoOption, TypeOfDataDisplayedOnTileOption, TypeOfNeighboursAllowedOption, DEFAULT_PATHFINDING_ALGO, DEFAULT_OBSTACLE_PLACED_ON_TILE, DEFAULT_MAZE_GEN_ALGO, DEFAULT_TYPE_OF_DATA_DISPLAYED_ON_TILE, DEFAULT_TYPE_OF_NEIGHBOURS_ALLOWED } from '../models/dropdown/dropdown-enums';
import { NeighbourOrdering, DEFAULT_NEIGHBOUR_VISIT_ORDER } from '../models/grid/neighbours';
import { Pos } from '../models/grid/pos';
import { TileEvent } from '../models/grid/tile-event';

@Injectable({
    providedIn: 'root'
})
export class DomUpdatesService {
    newAnimationIndexAction$ = new BehaviorSubject<AnimationIndexAction>({ kind: 'Reset' });
    newPathfindingAlgosAction$ = new BehaviorSubject<PathfindingAlgosAction>({ kind: 'Reset' });
    setAnimationRunning$ = new BehaviorSubject<boolean>(false);
    setAnimationDelay$ = new BehaviorSubject<number>(0);
    setNeighbourVisitOrdering$ = new BehaviorSubject<NeighbourOrdering>(DEFAULT_NEIGHBOUR_VISIT_ORDER);
    setObstaclePlacedOnTile$ = new BehaviorSubject<ObstaclePlacedOnTileOption>(DEFAULT_OBSTACLE_PLACED_ON_TILE);
    setMazeGenAlgo$ = new BehaviorSubject<MazeGenAlgoOption>(DEFAULT_MAZE_GEN_ALGO);
    setTypeOfDataDisplayedOnTile$ = new BehaviorSubject<TypeOfDataDisplayedOnTileOption>(DEFAULT_TYPE_OF_DATA_DISPLAYED_ON_TILE);
    setTypeOfNeighboursAllowed$ = new BehaviorSubject<TypeOfNeighboursAllowedOption>(DEFAULT_TYPE_OF_NEIGHBOURS_ALLOWED);
    clearBarrierAndWeightGrids$ = new Subject<void>();
    activateTile$ = new Subject<Pos>();
    drag$ = new Subject<TileEvent>();
    drop$ = new Subject<TileEvent>();
}
