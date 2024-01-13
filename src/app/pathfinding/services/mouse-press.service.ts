import { Inject, Injectable } from "@angular/core";
import { merge, fromEvent, map, throttleTime } from "rxjs";
import { StateService } from "./state.service";
import { mousePress } from "../pathfinding.tokens";
import { BridgeService } from "./bridge";
import { DomUpdatesService } from "./dom-updates.service";

@Injectable({
    providedIn: 'root',
})
export class MousePressService implements StateService<boolean>  {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(mousePress) bridgeToOtherStreams: BridgeService<boolean>,
    ) {
        bridgeToOtherStreams.link(this.stream$);
    }

    private handleDrop$ = this.domUpdates.drop$.pipe(
        throttleTime(100),
        map(() => false)
    );

    private handleMouseEvents$ = merge(fromEvent(document, 'mousedown'), fromEvent(document, 'mouseup')).pipe(
        map((event: Event) => (event as MouseEvent).buttons === 1)
    );

    stream$ = merge(this.handleDrop$, this.handleMouseEvents$);
}
