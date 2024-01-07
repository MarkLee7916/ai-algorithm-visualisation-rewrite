import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { AnimationIndexAction } from '../models/actions/actions';
import { PathfindingAlgoOption, ObstaclePlacedOnTileOption, MazeGenAlgoOption, TypeOfDataDisplayedOnTileOption, TypeOfNeighboursAllowedOption, DEFAULT_PATHFINDING_ALGO, DEFAULT_OBSTACLE_PLACED_ON_TILE, DEFAULT_MAZE_GEN_ALGO, DEFAULT_TYPE_OF_DATA_DISPLAYED_ON_TILE, DEFAULT_TYPE_OF_NEIGHBOURS_ALLOWED } from '../models/dropdown/dropdown-enums';
import { NeighbourOrdering, DEFAULT_NEIGHBOUR_VISIT_ORDER } from '../models/grid/neighbours';
import { Pos } from '../models/grid/pos';
import { TileEvent } from '../models/grid/tile-event';

@Injectable({
    providedIn: 'root'
})
export class DomUpdatesService {
    // TODO: find a better way to initialise app with default values
    newAnimationIndexAction$ = new BehaviorSubject<AnimationIndexAction>({ kind: 'Reset' });
    setAnimationRunning$ = new BehaviorSubject<boolean>(false);
    setAnimationDelay$ = new BehaviorSubject<number>(0);
    setNeighbourVisitOrdering$ = new BehaviorSubject<NeighbourOrdering>(DEFAULT_NEIGHBOUR_VISIT_ORDER);
    setPathfindingAlgo$ = new BehaviorSubject<PathfindingAlgoOption>(DEFAULT_PATHFINDING_ALGO);
    setObstaclePlacedOnTile$ = new BehaviorSubject<ObstaclePlacedOnTileOption>(DEFAULT_OBSTACLE_PLACED_ON_TILE);
    setMazeGenAlgo$ = new BehaviorSubject<MazeGenAlgoOption>(DEFAULT_MAZE_GEN_ALGO);
    setTypeOfTypeOfDataDisplayedOnTile$ = new BehaviorSubject<TypeOfDataDisplayedOnTileOption>(DEFAULT_TYPE_OF_DATA_DISPLAYED_ON_TILE);
    setTypeOfNeighboursAllowed$ = new BehaviorSubject<TypeOfNeighboursAllowedOption>(DEFAULT_TYPE_OF_NEIGHBOURS_ALLOWED);
    clearBarrierAndWeightGrids$ = new ReplaySubject<void>();
    activateTile$ = new ReplaySubject<Pos>();
    drag$ = new ReplaySubject<TileEvent>();
    drop$ = new ReplaySubject<TileEvent>();
}
