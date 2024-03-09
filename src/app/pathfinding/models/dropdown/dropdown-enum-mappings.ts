import { UncheckedObjMap } from "../../../shared/models/uncheckedObjMap";
import { genDivisionMaze, genFilledGridMaze, genRandomMaze } from "../../algos/maze-gen-algos";
import { unidirectionalAStar } from "../../algos/unidirectional-a-star";
import { unidirectionalBFS } from "../../algos/unidirectional-breadth-first-search";
import { unidirectionalDFS } from "../../algos/unidirectional-depth-first-search";
import { unidirectionalDijkstras } from "../../algos/unidirectional-dijkstras";
import { unidirectionalGBFS } from "../../algos/unidirectional-greedy-best-first-search";
import { unidirectionalRandom } from "../../algos/unidirectional-random";
import { ConcretePathfindingAlgoImpl } from "../algos/concrete-pathfinding-algo-impl";
import { MazeGenAlgoImpl } from "../algos/maze-gen-algo-impl";
import { FilterNeighboursImpl, keepAllNeighbours, keepDiagonalNeigbours, keepNonDiagonalNeigbours } from "../grid/neighbours";
import { MazeGenAlgoOption, PathfindingAlgoOption, TypeOfNeighboursAllowedOption } from "./dropdown-enums";

export const pathfindingAlgoOptionToImpl = new UncheckedObjMap<PathfindingAlgoOption, ConcretePathfindingAlgoImpl>([
    [PathfindingAlgoOption.BFS, unidirectionalBFS],
    [PathfindingAlgoOption.DFS, unidirectionalDFS],
    [PathfindingAlgoOption.Random, unidirectionalRandom],
    [PathfindingAlgoOption.GBFS, unidirectionalGBFS],
    [PathfindingAlgoOption.Dijkstras, unidirectionalDijkstras],
    [PathfindingAlgoOption.Astar, unidirectionalAStar]
]);

export const typeOfNeighboursAllowedOptionToImpl = new UncheckedObjMap<
    TypeOfNeighboursAllowedOption,
    FilterNeighboursImpl
>([
    [TypeOfNeighboursAllowedOption.AllDirections, keepAllNeighbours],
    [TypeOfNeighboursAllowedOption.Diagonals, keepDiagonalNeigbours],
    [TypeOfNeighboursAllowedOption.NonDiagonals, keepNonDiagonalNeigbours],
]);

export const mazeGenAlgoOptionToImpl = new UncheckedObjMap<
    MazeGenAlgoOption,
    MazeGenAlgoImpl
>([
    [MazeGenAlgoOption.Division, genDivisionMaze],
    [MazeGenAlgoOption.FillGrid, genFilledGridMaze],
    [MazeGenAlgoOption.Random, genRandomMaze],
]);