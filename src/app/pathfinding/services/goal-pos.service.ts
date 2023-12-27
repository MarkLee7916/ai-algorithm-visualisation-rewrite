import { Injectable, Inject } from "@angular/core";
import { Pos } from "../models/grid/pos";
import { bridgeFromGoalPos, bridgeFromStartPos } from "../pathfinding.tokens";
import { BridgeService } from "./bridge";
import { DomUpdatesService } from "./dom-updates.service";
import { filter, map, tap, withLatestFrom } from "rxjs";
import { isEqual } from "lodash";

@Injectable({
    providedIn: 'root'
})
export class GoalPosService {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(bridgeFromStartPos) private startPos: BridgeService<Pos>,
        @Inject(bridgeFromGoalPos) private bridgeToOtherStreams: BridgeService<Pos>,
    ) {
        this.getStream().subscribe()
    }

    getStream() {
        return this.goalPos$;
    }

    private goalPos$ = this.domUpdates.setGoalPos$.pipe(
        withLatestFrom(this.startPos.getStream()),
        filter(([goalPos, startPos]) => !isEqual(goalPos, startPos)),
        map(([pos,]) => pos),
        tap(pos => this.bridgeToOtherStreams.next(pos))
    )
}
