export enum ObstaclePlacedOnTileOption {
    Barrier = 'Barrier',
    RandomWeight = 'Random Weight',
    CustomWeight = 'Custom Weight',
}

export enum MazeGenAlgoOption {
    Random = 'Random Grid',
    FillGrid = 'Fill Grid',
    Division = 'Division',
}

export enum PathfindingAlgoOption {
    Astar = 'A*',
    Dijkstras = 'Dijkstra',
    BFS = 'Breadth First Search',
    DFS = 'Depth First Search',
    GBFS = 'Greedy Best First Search',
    Random = 'Random Search',
}

export enum TypeOfNeighboursAllowedOption {
    NonDiagonals = 'Non Diagonals Only',
    Diagonals = 'Diagonals Only',
    AllDirections = 'All Directions',
}

export enum TypeOfDataDisplayedOnTileOption {
    Weights = 'Display Weight',
    PathLengthsFromStart = 'Display Start Distance',
    HeuristicDists = 'Display Heuristic Distance',
}

export const DEFAULT_OBSTACLE_PLACED_ON_TILE = ObstaclePlacedOnTileOption.RandomWeight;

export const DEFAULT_MAZE_GEN_ALGO = MazeGenAlgoOption.Random;

export const DEFAULT_PATHFINDING_ALGO = PathfindingAlgoOption.BFS;

export const DEFAULT_TYPE_OF_NEIGHBOURS_ALLOWED = TypeOfNeighboursAllowedOption.NonDiagonals;

export const DEFAULT_TYPE_OF_DATA_DISPLAYED_ON_TILE = TypeOfDataDisplayedOnTileOption.Weights;

export function isPathfindingAlgoOption(algo: string): algo is PathfindingAlgoOption {
    return Object.values(PathfindingAlgoOption).map(option => option.toString()).includes(algo);
}