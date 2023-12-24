import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BehaviorSubject, Observable, Subject, combineLatest, distinctUntilChanged, filter, interval, map, merge, scan, switchMap, take, throwError, withLatestFrom } from "rxjs";
import { AnimationFrame, initBlankAnimationFrame } from "../../models/animation/animation-frame";
import { DEFAULT_NEIGHBOUR_VISIT_ORDER, NeighbourOrdering } from "../../models/grid/neighbours";
import { AnimationIndexAction } from "../../models/actions/actions";
import { PathfindingAlgoOption, ObstaclePlacedOnTileOption, NeighboursAllowedOption, DataDisplayedOnTileOption, MazeGenAlgoOption } from "../../models/dropdown/dropdown-enums";
import { WeightGrid } from "../../models/grid/weight-grid";
import { BarrierGrid } from "../../models/grid/barrier-grid";
import { Pos, isSamePos } from "../../models/grid/pos";

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
    updatesFromDom = {
        animationIndexAction$: new Subject<AnimationIndexAction>(),
        isAnimationRunning$: new BehaviorSubject<boolean>(false),
        animationDelay$: new BehaviorSubject<number>(1000),
        neighbourVisitOrdering$: new BehaviorSubject<NeighbourOrdering>(DEFAULT_NEIGHBOUR_VISIT_ORDER),
        pathfindingAlgo$: new Subject<PathfindingAlgoOption>(),
        obstaclePlacedOnTile$: new Subject<ObstaclePlacedOnTileOption>(),
        mazeGenAlgo$: new Subject<MazeGenAlgoOption>(),
        dataDisplayedOnTile$: new Subject<DataDisplayedOnTileOption>(),
        neighboursAllowed$: new Subject<NeighboursAllowedOption>(),
        startPos$: new Subject<Pos>(),
        goalPos$: new Subject<Pos>()
    }

    problemStatementChanges$: Observable<ProblemStatement> = combineLatest([
        this.updatesFromDom.neighbourVisitOrdering$,
        this.updatesFromDom.neighboursAllowed$,
        this.updatesFromDom.pathfindingAlgo$,
    ]).pipe(
        distinctUntilChanged()
    );

    isAnimationRunning$ = merge(
        this.updatesFromDom.isAnimationRunning$,
        this.problemStatementChanges$.pipe(
            map(() => false)
        )
    );

    animate$: Observable<AnimationIndexAction> = this.isAnimationRunning$.pipe(
        filter(isAnimationRunning => isAnimationRunning),
        withLatestFrom(this.updatesFromDom.animationDelay$),
        switchMap(([, animationDelay]) =>
            interval(animationDelay).pipe(
                map((): AnimationIndexAction => ({ kind: 'Increment' }))
            )
        )
    );

    // Animation index updates when either an event requests it or the problem statement changes
    animationIndex$: Observable<number> =
        merge(
            this.animate$,
            this.updatesFromDom.animationIndexAction$,
            this.problemStatementChanges$.pipe(
                map((): AnimationIndexAction => ({ kind: 'Reset' }))
            )
        ).pipe(
            scan((currentIndex, action) => {
                if (action.kind === 'Increment') {
                    return currentIndex + 1;
                } else if (action.kind === 'Decrement') {
                    return currentIndex - 1;
                } else if (action.kind === 'Reset') {
                    return 0;
                } else if (action.kind === 'SetValue') {
                    return action.valueToSetTo;
                } else {
                    throw new Error('Unexpected action kind');
                }
            }, 0),
        );

    // Animation frames update when animation index changes and the problem statement has changed from last time
    animationFrames$: Observable<AnimationFrame[]> =
        this.problemStatementChanges$.pipe(
            switchMap(problemStatement => this.animationIndex$.pipe(
                filter(animationIndex => animationIndex > 0),
                map(() => {
                    const [

                    ] = problemStatement;

                    // Calculate animation frames here
                    return [initBlankAnimationFrame(2, 2)];
                }),
                take(1)
            )),
        );

    currentAnimationFrame$: Observable<AnimationFrame> =
        combineLatest([this.animationFrames$, this.animationIndex$], (frames, index) => {
            if (index < 0) {
                return frames[0];
            } else if (index >= frames.length) {
                return frames[frames.length - 1];
            } else {
                return frames[index];
            }
        });

    // startPos should be filtered out of stream if goalPos is the same
    // goalPos should be filtered out of stream if startPos is the same
    // Circular dependency, how to handle?

}

type ProblemStatement = [
    NeighbourOrdering,
    NeighboursAllowedOption,
    PathfindingAlgoOption,
    WeightGrid,
    BarrierGrid,
    Pos,
    Pos
];
