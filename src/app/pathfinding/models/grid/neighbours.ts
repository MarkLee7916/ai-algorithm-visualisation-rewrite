import { UncheckedObjMap } from "../../../shared/models/uncheckedObjMap";
import { Pos } from "./pos";

export enum Neighbour {
    BottomLeft,
    Left,
    TopLeft,
    Top,
    TopRight,
    Right,
    BottomRight,
    Bottom
}

export type NeighbourPosTransformation = { vertical: number; horizontal: number };

export const DEFAULT_NEIGHBOUR_VISIT_ORDER = [
    Neighbour.BottomLeft,
    Neighbour.Left,
    Neighbour.TopLeft,
    Neighbour.Top,
    Neighbour.TopRight,
    Neighbour.Right,
    Neighbour.BottomRight,
    Neighbour.Bottom
];

export const DIAGONAL_NEIGHBOURS = new Set<Neighbour>([
    Neighbour.BottomLeft,
    Neighbour.TopLeft,
    Neighbour.TopRight,
    Neighbour.BottomRight,
]);

export const NON_DIAGONAL_NEIGHBOURS = new Set<Neighbour>([
    Neighbour.Left,
    Neighbour.Top,
    Neighbour.Right,
    Neighbour.Bottom
]);

export const neighbourToPosTransformation = new UncheckedObjMap<Neighbour, NeighbourPosTransformation>([
    [Neighbour.BottomLeft, { vertical: -1, horizontal: -1 }],
    [Neighbour.Left, { vertical: -1, horizontal: 0 }],
    [Neighbour.TopLeft, { vertical: -1, horizontal: 1 }],
    [Neighbour.Top, { vertical: 0, horizontal: -1 }],
    [Neighbour.TopRight, { vertical: 0, horizontal: 1 }],
    [Neighbour.Right, { vertical: 1, horizontal: -1 }],
    [Neighbour.BottomRight, { vertical: 1, horizontal: 0 }],
    [Neighbour.Bottom, { vertical: 1, horizontal: 1 }]
]);

export function genNeighbouringPositions(pos: Pos, neighbours: Neighbour[]) {
    return neighbours.map(neighbour => {
        const { vertical, horizontal } = neighbourToPosTransformation.get(neighbour);

        return {
            row: pos.row + vertical,
            col: pos.col + horizontal,
        };
    });
}