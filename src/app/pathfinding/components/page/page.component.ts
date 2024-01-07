import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { WeightGridService } from "../../services/weight-grid.service";
import { BarrierGridService } from "../../services/barrier-grid.service";
import { StartPosService } from "../../services/start-pos.service";
import { GoalPosService } from "../../services/goal-pos.service";
import { CurrentAnimationFrameService } from "../../services/current-animation-frame.service";
import { DomUpdatesService } from "../../services/dom-updates.service";
import { AnimateService } from "../../services/animate.service";
import { AnimationFramesService } from "../../services/animation-frames.service";
import { AnimationIndexService } from "../../services/animation-index.service";
import { AnimationRunningService } from "../../services/animation-running.service";
import { GridDimensionsService } from "../../services/grid-dimensions.service";
import { HeuristicDistGridService } from "../../services/heuristic-dist-grid.service";
import { MousePressService } from "../../services/mouse-press.service";
import { ProblemStatementChangesService } from "../../services/problem-statement-changes.service";
import { combineLatest } from "rxjs";
import { LastPosDraggedFromService } from "../../services/last-pos-dragged-from";

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
    constructor(
        // TODO: find a better way of including all the services in the compilation 
        public weightGridService: WeightGridService,
        public barrierGridService: BarrierGridService,
        public startPosService: StartPosService,
        public goalPosService: GoalPosService,
        public currentAnimationFrameService: CurrentAnimationFrameService,
        public domUpdatesService: DomUpdatesService,
        public animateService: AnimateService,
        public animationFramesService: AnimationFramesService,
        public animationIndexService: AnimationIndexService,
        public animationRunningService: AnimationRunningService,
        public gridDimensionsService: GridDimensionsService,
        public heuristicDistGridService: HeuristicDistGridService,
        public mousePressService: MousePressService,
        public problemStatementChangesService: ProblemStatementChangesService,
        public lastPosDraggedFromService: LastPosDraggedFromService
    ) { }
}


