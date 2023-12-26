import { Inject, Injectable } from "@angular/core";
import { Observable, switchMap, filter, map, take, tap } from "rxjs";
import { AnimationFrame, initBlankAnimationFrame } from "../models/animation/animation-frame";
import { ProblemStatementChangesService } from "./problem-statement-changes.service";
import { AnimationIndexService } from "./animation-index.service";
import { BridgeService } from "./bridge";

@Injectable({
    providedIn: 'root'
})
export class AnimationFramesService {
    constructor(
        private problemStatementChanges: ProblemStatementChangesService,
        private animationIndex: AnimationIndexService,
        @Inject('bridgeFromAnimationFrames') private bridgeToAnotherStream: BridgeService<AnimationFrame[]>,
    ) { }

    getStream() {
        return this.animationFrames$;
    }

    // Animation frames update when animation index changes and the problem statement has changed from last time
    private animationFrames$: Observable<AnimationFrame[]> =
        this.problemStatementChanges.getStream().pipe(
            switchMap(problemStatement => this.animationIndex.getStream().pipe(
                filter(animationIndex => animationIndex > 0),
                map(() => {
                    const [

                    ] = problemStatement;

                    // Calculate animation frames here
                    return [initBlankAnimationFrame(2, 2)];
                }),
                tap(frames => this.bridgeToAnotherStream.next(frames)),
                take(1)
            ))
        );
}
