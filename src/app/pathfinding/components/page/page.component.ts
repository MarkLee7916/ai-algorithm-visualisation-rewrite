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
import { combineLatest, map, switchMap } from "rxjs";
import { LastPosDraggedFromService } from "../../services/last-pos-dragged-from";
import { PathfindingAlgosService } from "../../services/pathfinding-algos.service";

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
    constructor(
        // TODO: find a better way of including all the services in the compilation 
        public domUpdates: DomUpdatesService,
        public weightGridService: WeightGridService,
        public barrierGridService: BarrierGridService,
        public startPosService: StartPosService,
        public goalPosService: GoalPosService,
        public currentAnimationFrameForMultipleAlgosService: CurrentAnimationFrameForMultipleAlgosService,
        public domUpdatesService: DomUpdatesService,
        public animateService: AnimateService,
        public animationFramesForMultipleAlgosService: AnimationFramesForMultipleAlgosService,
        public animationIndexService: AnimationIndexService,
        public animationRunningService: AnimationRunningService,
        public gridDimensionsService: GridDimensionsService,
        public heuristicDistGridService: HeuristicDistGridService,
        public mousePressService: MousePressService,
        public problemStatementChangesService: ProblemStatementChangesService,
        public lastPosDraggedFromService: LastPosDraggedFromService,
        public pathfindingAlgosService: PathfindingAlgosService
    ) { }

    gridBasedStreams = [
        this.weightGridService.stream$,
        this.barrierGridService.stream$,
        this.heuristicDistGridService.stream$
    ];

    isLoadingFromGridDimensionsChange$ = this.gridDimensionsService.stream$.pipe(
        switchMap(({ height, width }) => combineLatest(this.gridBasedStreams).pipe(
            map(grids => grids.some(grid => grid.length !== height || grid[0].length !== width))
        ))
    );

    updateAnimationIndexFromRange(event: Event) {
        const rangeElement = event.target as HTMLInputElement;
        const valueToSetTo = parseInt(rangeElement.value, 10);

        this.domUpdatesService.newAnimationIndexAction$.next({ kind: 'SetValue', valueToSetTo });
    }
}


