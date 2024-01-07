import { Inject, Injectable } from "@angular/core";
import { merge, fromEvent, map } from "rxjs";
import { StateService } from "./state.service";
import { mousePress } from "../pathfinding.tokens";
import { BridgeService } from "./bridge";

@Injectable({
    providedIn: 'root',
})
export class MousePressService implements StateService<boolean>  {
    constructor(
        @Inject(mousePress) bridgeToOtherStreams: BridgeService<boolean>,
    ) {
        bridgeToOtherStreams.link(this.getStream());
    }

    getStream() {
        return this.isMouseDown$;
    }

    private isMouseDown$ = merge(fromEvent(document, 'mousedown'), fromEvent(document, 'mouseup')).pipe(
        map((event: Event) => (event as MouseEvent).buttons === 1)
    );
}
