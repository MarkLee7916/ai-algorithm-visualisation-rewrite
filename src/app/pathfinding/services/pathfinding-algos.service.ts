import { Inject, Injectable } from "@angular/core";
import { shareReplay, scan } from "rxjs";
import { StateService } from "./state.service";
import { pathfindingAlgos } from "../pathfinding.tokens";
import { BridgeService } from "./bridge";
import { DomUpdatesService } from "./dom-updates.service";
import { DEFAULT_PATHFINDING_ALGO, PathfindingAlgoOption } from "../models/dropdown/dropdown-enums";

@Injectable({
    providedIn: 'root',
})
export class PathfindingAlgosService implements StateService<PathfindingAlgoOption[]>  {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(pathfindingAlgos) bridgeToOtherStreams: BridgeService<PathfindingAlgoOption[]>,
    ) {
        bridgeToOtherStreams.link(this.stream$);
    }

    stream$ = this.domUpdates.newPathfindingAlgosAction$.pipe(
        scan((algos, action) => {
            if (action.kind === 'Add') {
                return algos.concat(DEFAULT_PATHFINDING_ALGO)
            } else if (action.kind === 'Reset') {
                return [DEFAULT_PATHFINDING_ALGO]
            } else if (action.kind === 'Remove') {
                return algos.slice(0, action.index).concat(algos.slice(action.index, algos.length));
            } else if (action.kind === 'Set') {
                return algos.slice(0, action.index).concat(action.algo).concat(algos.slice(action.index, algos.length));
            } else {
                throw new Error('Unexpected action kind');
            }
        }, [DEFAULT_PATHFINDING_ALGO]),
        shareReplay(1)
    );
}
