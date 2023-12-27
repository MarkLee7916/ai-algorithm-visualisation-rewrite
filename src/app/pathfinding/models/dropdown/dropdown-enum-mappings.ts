import { UncheckedObjMap } from "../../../shared/models/uncheckedObjMap";
import { unidirectionalBFS } from "../../algos/unidirectional-breadth-first-search";
import { ConcretePathfindingAlgoImpl } from "../algos/concrete-pathfinding-algo-impl";
import { FilterNeighboursImpl, keepAllNeighbours, keepDiagonalNeigbours, keepNonDiagonalNeigbours } from "../grid/neighbours";
import { PathfindingAlgoOption, TypeOfNeighboursAllowedOption } from "./dropdown-enums";

export const pathfindingAlgoOptionToImpl = new UncheckedObjMap<PathfindingAlgoOption, ConcretePathfindingAlgoImpl>([
    [PathfindingAlgoOption.BFS, unidirectionalBFS]
]);

export const typeOfNeighboursAllowedOptionToImpl = new UncheckedObjMap<
    TypeOfNeighboursAllowedOption,
    FilterNeighboursImpl
>([
    [TypeOfNeighboursAllowedOption.AllDirections, keepAllNeighbours],
    [TypeOfNeighboursAllowedOption.Diagonals, keepDiagonalNeigbours],
    [TypeOfNeighboursAllowedOption.NonDiagonals, keepNonDiagonalNeigbours],
]);