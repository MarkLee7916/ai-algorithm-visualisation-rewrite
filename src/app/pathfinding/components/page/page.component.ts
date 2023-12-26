import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AnimateService } from "../../services/animate.service";
import { AnimationIndexService } from "../../services/animation-index.service";
import { AnimationRunningService } from "../../services/animation-running.service";
import { AnimationFramesService } from "../../services/animation-frames.service";
import { CurrentAnimationFrameService } from "../../services/current-animation-frame.service";
import { DomUpdatesService } from "../../services/dom-updates.service";
import { ProblemStatementChangesService } from "../../services/problem-statement-changes.service";

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
    constructor(
        animateService: AnimateService,
        animationIndexService: AnimationIndexService,
        animationRunningService: AnimationRunningService,
        animationFramesService: AnimationFramesService,
        currentAnimationFrameService: CurrentAnimationFrameService,
        domUpdatesService: DomUpdatesService,
        problemStatementChangesService: ProblemStatementChangesService
    ) { }
}


