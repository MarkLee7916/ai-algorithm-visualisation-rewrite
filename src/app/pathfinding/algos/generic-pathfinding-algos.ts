import { ObjMap } from "../../shared/models/objMap";
import { assertDefined } from "../../shared/utils";
import { Agenda } from "../models/agenda-data-structures/agenda";
import { AnimationFrame, initBlankAnimationFrame } from "../models/animation/animation-frame";
import { TileAnimationFrame, setFrameAt } from "../models/grid/animation-frame-grid";
import { BarrierGrid, hasBarrierAt } from "../models/grid/barrier-grid";
import { ExpandedGrid, countOfTilesThatHaveBeenExpanded, hasBeenExpandedAt, initExpandedGrid, markExpandedAt } from "../models/grid/expanded-grid";
import { height, width } from "../models/grid/grid";
import { Neighbour, genNeighbouringPositions } from "../models/grid/neighbours";
import { initPathLengthGrid, setPathLengthAt } from "../models/grid/path-length-grid";
import { Pos, formatPosAsCoord, hasPos, isOnGrid, isSamePos } from "../models/grid/pos";
import { VisitedGrid, countOfTilesThatHaveBeenVisited, hasBeenVisitedAt, initVisitedGrid, markVisitedAt } from "../models/grid/visited-grid";
import { WeightGrid, weightAt } from "../models/grid/weight-grid";

export function genericUnidirectionalSearch(
    startPos: Pos,
    goalPos: Pos,
    agenda: Agenda<Pos>,
    weightGrid: WeightGrid,
    barrierGrid: BarrierGrid,
    neighbourOrdering: Neighbour[],
    pathLengthMap: ObjMap<Pos, number>
): AnimationFrame[] {
    const gridHeight = height(weightGrid);
    const gridWidth = width(weightGrid);

    const pathMap = new ObjMap<Pos, Pos>([]);
    const expandedGrid = initExpandedGrid(gridHeight, gridWidth);
    const visitedGrid = initVisitedGrid(gridHeight, gridWidth);
    const frames = [initBlankAnimationFrame(gridHeight, gridWidth)];

    pathLengthMap.set(startPos, 0);
    markVisitedAt(visitedGrid, startPos.row, startPos.col);
    agenda.add(startPos);

    while (!agenda.isEmpty()) {
        const isFound = considerNextStep(
            pathMap,
            visitedGrid,
            expandedGrid,
            agenda,
            goalPos,
            weightGrid,
            barrierGrid,
            pathLengthMap,
            neighbourOrdering,
            frames
        );

        if (isFound) {
            // TODO: add logic for final path here?
            break;
        }
    }

    return frames;
}

function considerNextStep(
    pathMap: ObjMap<Pos, Pos>,
    visitedGrid: VisitedGrid,
    expandedGrid: ExpandedGrid,
    agenda: Agenda<Pos>,
    goalPosForThisRun: Pos,
    weightGrid: WeightGrid,
    barrierGrid: BarrierGrid,
    pathLengthMap: ObjMap<Pos, number>,
    neighbourOrdering: Neighbour[],
    frames: AnimationFrame[]
) {
    const gridHeight = height(weightGrid);
    const gridWidth = width(weightGrid);
    const posBeingExpanded = agenda.remove();

    markExpandedAt(expandedGrid, posBeingExpanded.row, posBeingExpanded.col);

    const expandComm = genExpansionCommentary(posBeingExpanded);
    frames.push(genAnimationFrame(pathMap, visitedGrid, expandedGrid, posBeingExpanded, [], goalPosForThisRun, pathLengthMap, expandComm));

    if (isSamePos(posBeingExpanded, goalPosForThisRun)) {
        return true;
    }

    const validNeighbours = genNeighbouringPositions(posBeingExpanded, neighbourOrdering).filter(
        pos => isOnGrid(gridHeight, gridWidth, pos) && !hasBarrierAt(barrierGrid, pos.row, pos.col)
    );
    const validUnvisitedNeighbours = validNeighbours.filter(({ row, col }) => !hasBeenVisitedAt(visitedGrid, row, col));
    const validVisitedNeighbours = validNeighbours.filter(({ row, col }) => hasBeenVisitedAt(visitedGrid, row, col));

    validUnvisitedNeighbours.forEach(neighPos => {
        const { row: neighRow, col: neighCol } = neighPos;
        const neighPathLength = assertDefined(pathLengthMap.get(posBeingExpanded)) + weightAt(weightGrid, neighRow, neighCol);
        agenda.add(neighPos);
        markVisitedAt(visitedGrid, neighRow, neighCol);
        pathLengthMap.set(neighPos, neighPathLength);
        pathMap.set(neighPos, posBeingExpanded);
    });

    validVisitedNeighbours.forEach(neighPos => {
        const { row: neighRow, col: neighCol } = neighPos;
        const neighPathLength = assertDefined(pathLengthMap.get(posBeingExpanded)) + weightAt(weightGrid, neighRow, neighCol);

        if (neighPathLength < assertDefined(pathLengthMap.get(neighPos))) {
            pathLengthMap.set(neighPos, neighPathLength);
            pathMap.set(neighPos, posBeingExpanded);
        }
    });

    const neighComm = genAddingNeighboursCommentary(posBeingExpanded, validUnvisitedNeighbours);
    frames.push(genAnimationFrame(pathMap, visitedGrid, expandedGrid, posBeingExpanded, validUnvisitedNeighbours, goalPosForThisRun, pathLengthMap, neighComm));

    return false;
}

function genAnimationFrame(
    pathMap: ObjMap<Pos, Pos>,
    visitedGrid: VisitedGrid,
    expandedGrid: ExpandedGrid,
    posBeingExpanded: Pos | null,
    positionsBeingAddedToAgenda: Pos[],
    goalPosForThisRun: Pos,
    pathLengthMap: ObjMap<Pos, number>,
    commentary: string
) {
    const gridHeight = height(visitedGrid);
    const gridWidth = width(visitedGrid);
    const frame = initBlankAnimationFrame(gridHeight, gridWidth);
    const finalPathLength = pathLengthMap.get(goalPosForThisRun);
    const pathList = convertPathMapToList(pathMap, posBeingExpanded)

    frame.commentary = commentary;
    frame.pathLengthGrid = convertPathLengthMapToGrid(gridHeight, gridWidth, pathLengthMap);
    frame.countOfTilesExpanded = countOfTilesThatHaveBeenExpanded(expandedGrid);
    frame.countOfTilesVisited = countOfTilesThatHaveBeenVisited(visitedGrid);

    if (hasPos(pathList, goalPosForThisRun)) {
        frame.finalPathLength = assertDefined(finalPathLength);
    }

    for (let row = 0; row < gridHeight; row++) {
        for (let col = 0; col < gridWidth; col++) {
            const pos = { row, col };

            if (hasPos(pathList, pos)) {
                setFrameAt(frame.grid, row, col, TileAnimationFrame.FinalPath);
            } else if (posBeingExpanded && isSamePos(posBeingExpanded, pos)) {
                setFrameAt(frame.grid, row, col, TileAnimationFrame.BeingExpanded);
            } else if (hasPos(positionsBeingAddedToAgenda, pos)) {
                setFrameAt(frame.grid, row, col, TileAnimationFrame.BeingAddedToAgenda);
            } else if (hasBeenExpandedAt(expandedGrid, row, col)) {
                setFrameAt(frame.grid, row, col, TileAnimationFrame.Expanded);
            } else if (hasBeenVisitedAt(visitedGrid, row, col)) {
                setFrameAt(frame.grid, row, col, TileAnimationFrame.Visited);
            }
        }
    }

    return frame
}

function convertPathMapToList(pathMap: ObjMap<Pos, Pos>, posBeingExpanded: Pos | null) {
    if (!posBeingExpanded) {
        return [];
    }

    const pathList = [posBeingExpanded];
    let currPos: Pos | undefined = posBeingExpanded;

    do {
        pathList.push(currPos);
        currPos = pathMap.get(currPos);
    } while (currPos);

    return pathList;
}

function convertPathLengthMapToGrid(height: number, width: number, pathLengthMap: ObjMap<Pos, number>) {
    const pathLengthGrid = initPathLengthGrid(height, width);

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const pathLength = pathLengthMap.get({ row, col });

            if (pathLength !== undefined) {
                setPathLengthAt(pathLengthGrid, row, col, pathLength);
            }
        }
    }

    return pathLengthGrid;
}

function genExpansionCommentary(posBeingExpanded: Pos) {
    return `Starting to expand ${formatPosAsCoord(posBeingExpanded)}`;
}

function genAddingNeighboursCommentary(posBeingExpanded: Pos, validUnvisitedNeighbours: Pos[]) {
    return `Adding unvisited neighbours of ${formatPosAsCoord(
        posBeingExpanded
    )} to agenda ... ${validUnvisitedNeighbours.length} found`;
}