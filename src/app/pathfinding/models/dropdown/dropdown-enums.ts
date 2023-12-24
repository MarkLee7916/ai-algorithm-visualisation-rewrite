export enum ObstaclePlacedOnTileOption {
    Barrier = 'Barrier',
    RandomWeight = 'Random Weight',
    CustomWeight = 'Custom Weight',
}

export enum MazeGenAlgoOption {
    Random = 'Random Grid',
    FillGrid = 'Fill Grid',
    VerticalDivision = 'Vertical Division',
    HorizontalDivision = 'Horizontal Division',
}

export enum PathfindingAlgoOption {
    Astar = 'A*',
    Dijkstras = 'Dijkstra',
    BFS = 'Breadth First Search',
    DFS = 'Depth First Search',
    GBFS = 'Greedy Best First Search',
    Random = 'Random Search',
}

export enum NeighboursAllowedOption {
    NonDiagonals = 'Non Diagonals Only',
    Diagonals = 'Diagonals Only',
    AllDirections = 'All Directions',
}

export enum DataDisplayedOnTileOption {
    Weights = 'Display Weight',
    Dists = 'Display Start Distance',
    Heuristics = 'Display Heuristic Distance',
}

export const DEFAULT_OBSTACLE_PLACED_ON_TILE = ObstaclePlacedOnTileOption.Barrier;

export const DEFAULT_MAZE_GEN_ALGO = MazeGenAlgoOption.Random;

export const DEFAULT_PATHFINDING_ALGO = PathfindingAlgoOption.BFS;

export const DEFAULT_NEIGHBOURS_ALLOWED = NeighboursAllowedOption.NonDiagonals;

export const DEFAULT_DATA_DISPLAYED_ON_TILE = DataDisplayedOnTileOption.Weights;
