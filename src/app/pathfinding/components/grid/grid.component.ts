import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, OnChanges, SimpleChanges } from "@angular/core";
import { WeightGrid, weightAt } from "../../models/grid/weight-grid";
import { BarrierGrid, hasBarrierAt } from "../../models/grid/barrier-grid";
import { Pos } from "../../models/grid/pos";
import { TypeOfDataDisplayedOnTileOption } from "../../models/dropdown/dropdown-enums";
import { AnimationFrame } from "../../models/animation/animation-frame";
import * as _ from 'lodash';
import { height, width } from "../../models/grid/grid";
import { pathLengthAt } from "../../models/grid/path-length-grid";
import { frameAt } from "../../models/grid/animation-frame-grid";
import { computeManhattanDist } from "../../algos/comparators";
import { HeuristicDistFromGoalGrid, distAt } from "../../models/grid/heuristic-dist-from-goal-grid";
import { TileEvent } from "../../models/grid/tile-event";

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnChanges {
    @Input() weightGrid!: WeightGrid;
    @Input() barrierGrid!: BarrierGrid;
    @Input() startPos!: Pos;
    @Input() goalPos!: Pos;
    @Input() typeOfDataDisplayedOnTile!: TypeOfDataDisplayedOnTileOption;
    @Input() willDisplayTooltipOnMouseOver!: boolean;
    @Input() animationFrame!: AnimationFrame;
    @Input() heuristicDistFromGoalGrid!: HeuristicDistFromGoalGrid;

    @Output() drag = new EventEmitter<TileEvent>();
    @Output() drop = new EventEmitter<TileEvent>();
    @Output() activate = new EventEmitter<Pos>();

    range = _.range;
    isEqual = _.isEqual;
    pathLengthAt = pathLengthAt;
    frameAt = frameAt;
    weightAt = weightAt;
    hasBarrierAt = hasBarrierAt;
    computeManhattanDist = computeManhattanDist;
    distAt = distAt;

    gridHeight!: number;
    gridWidth!: number;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['weightGrid']) {
            this.gridHeight = height(this.weightGrid);
            this.gridWidth = width(this.weightGrid);
        }
    }
}