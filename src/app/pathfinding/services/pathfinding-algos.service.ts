import { Inject, Injectable } from "@angular/core";
import { shareReplay, scan, startWith } from "rxjs";
import { StateService } from "./state.service";
import { pathfindingAlgos } from "../pathfinding.tokens";
import { BridgeService } from "./bridge";
import { DomUpdatesService } from "./dom-updates.service";
import { DEFAULT_PATHFINDING_ALGO, PathfindingAlgoOption } from "../models/dropdown/dropdown-enums";
import { PathfindingAlgosAction } from "../models/actions/actions";

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

    readonly MAX_NUMBER_OF_ALGOS = 4;

    readonly INITIALISE: PathfindingAlgosAction = { kind: 'Initialise' };

    stream$ = this.domUpdates.newPathfindingAlgosAction$.pipe(
        startWith(this.INITIALISE),
        scan((selectedAlgos, action) => {
            if (action.kind === 'Initialise') {
                return selectedAlgos;
            } else if (action.kind === 'Add') {
                const availableAlgos = Object.values(PathfindingAlgoOption) as PathfindingAlgoOption[];
                const firstAvailableAlgo = availableAlgos.find(algo => !selectedAlgos.includes(algo));
                return selectedAlgos.concat(firstAvailableAlgo ? firstAvailableAlgo : DEFAULT_PATHFINDING_ALGO);
            } else if (action.kind === 'Reset') {
                return [DEFAULT_PATHFINDING_ALGO]
            } else if (action.kind === 'Remove') {
                const selectedAlgosBeforeItemToRemove = selectedAlgos.slice(0, action.index);
                const selectedAlgosAfterItemToRemove = selectedAlgos.slice(action.index + 1, selectedAlgos.length);
                return selectedAlgosBeforeItemToRemove.concat(selectedAlgosAfterItemToRemove);
            } else if (action.kind === 'Set') {
                const selectedAlgosBeforeItemToSet = selectedAlgos.slice(0, action.index);
                const selectedAlgosAfterItemToSet = selectedAlgos.slice(action.index + 1, selectedAlgos.length);
                return selectedAlgosBeforeItemToSet.concat(action.algo, selectedAlgosAfterItemToSet);
            } else {
                throw new Error('Unexpected action kind');
            }
        }, [DEFAULT_PATHFINDING_ALGO]),
        shareReplay(1)
    );
}
