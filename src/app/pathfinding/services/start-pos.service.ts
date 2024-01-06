import { Injectable, Inject } from "@angular/core";
import { Pos, genDefaultStartPos, isSamePos } from "../models/grid/pos";
import { goalPos, startPos } from "../pathfinding.tokens";
import { BridgeService } from "./bridge";
import { DomUpdatesService } from "./dom-updates.service";
import { filter, map, startWith, tap, withLatestFrom } from "rxjs";
import { StateService } from "./state.service";

@Injectable({
    providedIn: 'root'
})
export class StartPosService implements StateService<Pos> {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(goalPos) private goalPos: BridgeService<Pos>,
        @Inject(startPos) bridgeToOtherStreams: BridgeService<Pos>,
    ) {
        bridgeToOtherStreams.link(this.getStream());
    }

    getStream() {
        return this.startPos$;
    }

    private startPos$ = this.domUpdates.setStartPos$.pipe(
        withLatestFrom(this.goalPos.getStream()),
        filter(([startPos, goalPos]) => !isSamePos(startPos, goalPos)),
        map(([pos,]) => pos),
        // TODO: recalculate when grid dimensions change using movePositionWithinBoundsOfGrid(), don't use startWith
        startWith(genDefaultStartPos()),
    )
}
