import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Observable, Subject, combineLatest, distinctUntilChanged, filter, interval, map, merge, scan, switchMap, take, throwError, withLatestFrom } from "rxjs";
import { AnimationFrame, initBlankAnimationFrame } from "../../models/animation/animation-frame";
import { Neighbour } from "../../models/grid/neighbours";
import { AnimationIndexAction } from "../../models/actions/actions";

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
    // These will only trigger when we receive an event from the DOM, including child components
    eventSubjects = {
        animationIndexAction$: new Subject<AnimationIndexAction>(),
        isAnimationRunning$: new Subject<boolean>,
        animationDelay$: new Subject<number>(),
        neighbourVisitOrdering$: new Subject<Neighbour[]>()
    }

    animate$: Observable<AnimationIndexAction> = this.eventSubjects.isAnimationRunning$.pipe(
        filter(isAnimationRunning => isAnimationRunning),
        withLatestFrom(this.eventSubjects.animationDelay$),
        switchMap(([, animationDelay]) =>
            interval(animationDelay).pipe(
                map((): AnimationIndexAction => ({ kind: 'Increment' }))
            )
        )
    );

    problemStatementChanges$: Observable<ProblemStatement> = combineLatest(
        this.eventSubjects.neighbourVisitOrdering$
    ).pipe(
        distinctUntilChanged()
    )

    // Animation index updates when either an event requests it or the problem statement changes
    animationIndex$: Observable<number> =
        merge(
            this.animate$,
            this.eventSubjects.animationIndexAction$,
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
                    // Calculate animation frames here
                    return [initBlankAnimationFrame(2, 2)];
                }),
                take(1)
            )),
        )

    currentAnimationFrame$ = combineLatest(this.animationFrames$, this.animationIndex$, (frames, index) => {
        if (index < 0) {
            return 0;
        } else if (index >= frames.length) {
            return frames.length - 1;
        } else {
            return index;
        }
    })
}

type ProblemStatement = [Neighbour[]];
