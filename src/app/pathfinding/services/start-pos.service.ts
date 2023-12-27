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
export class StartPosService {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(bridgeFromGoalPos) private goalPos: BridgeService<Pos>,
        @Inject(bridgeFromStartPos) private bridgeToOtherStreams: BridgeService<Pos>,
    ) {
        this.getStream().subscribe()
    }

    getStream() {
        return this.startPos$;
    }

    private startPos$ = this.domUpdates.setStartPos$.pipe(
        withLatestFrom(this.goalPos.getStream()),
        filter(([startPos, goalPos]) => !isEqual(startPos, goalPos)),
        map(([pos,]) => pos),
        tap(pos => this.bridgeToOtherStreams.next(pos))
    )
}
