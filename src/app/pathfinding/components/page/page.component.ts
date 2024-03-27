import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { WeightGridService } from "../../services/weight-grid.service";
import { BarrierGridService } from "../../services/barrier-grid.service";
import { StartPosService } from "../../services/start-pos.service";
import { GoalPosService } from "../../services/goal-pos.service";
import { CurrentAnimationFrameForMultipleAlgosService } from "../../services/current-animation-frame.service";
import { DomUpdatesService } from "../../services/dom-updates.service";
import { AnimateService } from "../../services/animate.service";
import { AnimationFramesForMultipleAlgosService } from "../../services/animation-frames-for-multiple-algos.service";
import { AnimationIndexService } from "../../services/animation-index.service";
import { AnimationRunningService } from "../../services/animation-running.service";
import { GridDimensionsService } from "../../services/grid-dimensions.service";
import { HeuristicDistGridService } from "../../services/heuristic-dist-grid.service";
import { MousePressService } from "../../services/mouse-press.service";
import { ProblemStatementChangesService } from "../../services/problem-statement-changes.service";
import { combineLatest, map, merge, switchMap } from "rxjs";
import { LastPosDraggedFromService } from "../../services/last-pos-dragged-from";
import { PathfindingAlgosService } from "../../services/pathfinding-algos.service";
import { ProblemStatement } from "../../models/problem-statement/problem-statement";
import { GridDimensions } from "../../models/grid/grid";
import { AnimationFramesForMultipleAlgos } from "../../models/animation/animation-frame";
import { MazeGenAlgoOption, ObstaclePlacedOnTileOption, TypeOfDataDisplayedOnTileOption, TypeOfNeighboursAllowedOption } from "../../models/dropdown/dropdown-enums";
import { PosToOpenCustomWeightInputAtService } from "../../services/custom-weight.service";

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
    constructor(
        // TODO: find a better way of including all the services in the compilation 
        public weightGrid: WeightGridService,
        public barrierGrid: BarrierGridService,
        public startPos: StartPosService,
        public goalPos: GoalPosService,
        public currentAnimationFrameForMultipleAlgos: CurrentAnimationFrameForMultipleAlgosService,
        public posToOpenCustomWeightInputAt: PosToOpenCustomWeightInputAtService,
        public domUpdates: DomUpdatesService,
        public animate: AnimateService,
        public animationFramesForMultipleAlgos: AnimationFramesForMultipleAlgosService,
        public animationIndex: AnimationIndexService,
        public animationRunning: AnimationRunningService,
        public gridDimensions: GridDimensionsService,
        public heuristicDistGrid: HeuristicDistGridService,
        public mousePress: MousePressService,
        public problemStatementChanges: ProblemStatementChangesService,
        public lastPosDraggedFrom: LastPosDraggedFromService,
        public pathfindingAlgos: PathfindingAlgosService
    ) { }

    ObstaclePlacedOnTileOption = ObstaclePlacedOnTileOption;
    TypeOfDataDisplayedOnTileOption = TypeOfDataDisplayedOnTileOption;
    TypeOfNeighboursAllowedOption = TypeOfNeighboursAllowedOption;
    MazeGenAlgoOption = MazeGenAlgoOption;

    numberOfAnimationFramesDisplay$ = merge(
        this.problemStatementChanges.stream$,
        this.animationFramesForMultipleAlgos.stream$,
        this.gridDimensions.stream$
    ).pipe(
        map((value) => {
            if (this.isInstanceOfAnimationFramesForMultipleAlgos(value)) {
                return value.lengthOfFramesForEachAlgo;
            } else {
                return "?";
            }
        })
    );

    shouldRenderAddGridButton$ = this.pathfindingAlgos.stream$.pipe(
        map(algos => algos.length < this.pathfindingAlgos.MAX_NUMBER_OF_ALGOS)
    );

    isInstanceOfAnimationFramesForMultipleAlgos(
        value: ProblemStatement | AnimationFramesForMultipleAlgos | GridDimensions
    ): value is AnimationFramesForMultipleAlgos {
        return (value as AnimationFramesForMultipleAlgos).lengthOfFramesForEachAlgo !== undefined;
    }

    updateAnimationIndexFromRange(event: Event) {
        const rangeElement = event.target as HTMLInputElement;
        const valueToSetTo = parseInt(rangeElement.value, 10);

        this.domUpdates.newAnimationIndexAction$.next({ kind: 'SetValue', valueToSetTo });
    }

    updateAnimationDelayFromRange(event: Event) {
        const rangeElement = event.target as HTMLInputElement;
        const valueToSetTo = parseInt(rangeElement.value, 10);

        this.domUpdates.animationDelay$.next(valueToSetTo);
    }
}


