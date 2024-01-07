import { Inject, Injectable } from "@angular/core";
import { StateService } from "./state.service";
import { Pos, isSamePos } from "../models/grid/pos";
import { combineLatest, filter, map, startWith, tap, throttleTime, withLatestFrom } from "rxjs";
import { BridgeService } from "./bridge";
import { DomUpdatesService } from "./dom-updates.service";
import { barrierGrid, goalPos, lastPosDraggedFrom, startPos } from "../pathfinding.tokens";
import { BarrierGrid, hasBarrierAt } from "../models/grid/barrier-grid";

@Injectable({
    providedIn: 'root'
})
export class LastPosDraggedFromService implements StateService<Pos | null> {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(startPos) private startPos: BridgeService<Pos>,
        @Inject(goalPos) private goalPos: BridgeService<Pos>,
        @Inject(lastPosDraggedFrom) bridgeToOtherStreams: BridgeService<Pos | null>,
    ) {
        bridgeToOtherStreams.link(this.getStream());
    }

    getStream() {
        return this.lastPosDraggedFrom$;
    }

    private canDragFrom(pos: Pos, startPos: Pos, goalPos: Pos) {
        return isSamePos(pos, startPos) || isSamePos(pos, goalPos);
    }

    lastPosDraggedFrom$ = this.domUpdates.drag$.pipe(
        throttleTime(100),
        withLatestFrom(this.startPos.getStream(), this.goalPos.getStream()),
        tap(([tileEvent, startPos, goalPos]) => {
            if (!this.canDragFrom(tileEvent.pos, startPos, goalPos)) {
                tileEvent.event.preventDefault();
            }
        }),
        filter(([tileEvent, startPos, goalPos]) => this.canDragFrom(tileEvent.pos, startPos, goalPos)),
        map(([tileEvent, ,]) => tileEvent.pos),
        startWith(null),
    )
}