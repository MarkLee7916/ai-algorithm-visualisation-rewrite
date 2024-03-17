import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from "@angular/core";
import { WeightGrid, weightAt } from "../../models/grid/weight-grid";
import { BarrierGrid, hasBarrierAt } from "../../models/grid/barrier-grid";
import { Pos, isSamePos } from "../../models/grid/pos";
import { TypeOfDataDisplayedOnTileOption } from "../../models/dropdown/dropdown-enums";
import { AnimationFrame } from "../../models/animation/animation-frame";
import { GridDimensions } from "../../models/grid/grid";
import { pathLengthAt } from "../../models/grid/path-length-grid";
import { frameAt } from "../../models/grid/animation-frame-grid";
import { HeuristicDistFromGoalGrid, distAt } from "../../models/grid/heuristic-dist-from-goal-grid";
import { TileEvent } from "../../models/grid/tile-event";
import { range } from "../../../shared/utils";

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
    @Input() weightGrid!: WeightGrid;
    @Input() barrierGrid!: BarrierGrid;
    @Input() startPos!: Pos;
    @Input() goalPos!: Pos;
    @Input() typeOfDataDisplayedOnTile!: TypeOfDataDisplayedOnTileOption;
    @Input() willDisplayTooltipOnMouseOver!: boolean;
    @Input() animationFrame!: AnimationFrame;
    @Input() heuristicDistFromGoalGrid!: HeuristicDistFromGoalGrid;
    @Input() gridDimensions!: GridDimensions;
    @Input() id!: number;

    @Output() drag = new EventEmitter<TileEvent>();
    @Output() drop = new EventEmitter<TileEvent>();
    @Output() activate = new EventEmitter<Pos>();

    range = range;
    isSamePos = isSamePos;
    pathLengthAt = pathLengthAt;
    frameAt = frameAt;
    weightAt = weightAt;
    hasBarrierAt = hasBarrierAt;
    distAt = distAt;
}