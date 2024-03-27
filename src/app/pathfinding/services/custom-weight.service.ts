import { Injectable } from "@angular/core";
import { filter, map, merge, scan, shareReplay, withLatestFrom } from "rxjs";
import { Pos, isSamePos } from "../models/grid/pos";
import { StateService } from "./state.service";
import { DomUpdatesService } from "./dom-updates.service";
import { ObstaclePlacedOnTileOption } from "../models/dropdown/dropdown-enums";

@Injectable({
    providedIn: 'root'
})
export class PosToOpenCustomWeightInputAtService implements StateService<Pos | null> {
    constructor(
        private domUpdates: DomUpdatesService
    ) { }

    handlePosActivated$ = this.domUpdates.activateAtPos$.pipe(
        withLatestFrom(this.domUpdates.obstaclePlacedOnTile$),
        map(([posActivated, obstacle]) => {
            if (obstacle !== ObstaclePlacedOnTileOption.CustomWeight) {
                return null;
            } else {
                return posActivated;
            }
        })
    );

    closeInputWhenCustomWeightOptionNewlySelected$ = this.domUpdates.obstaclePlacedOnTile$.pipe(
        filter(obstacle => obstacle === ObstaclePlacedOnTileOption.CustomWeight),
        map(() => null)
    );

    closeInputWhenCustomWeightAdded$ = this.domUpdates.addCustomWeightAt$.pipe(
        map(() => null)
    );

    closeInputFromUserClick$ = this.domUpdates.closeCustomWeightInput$.pipe(
        map(() => null)
    );

    stream$ = merge(
        this.closeInputWhenCustomWeightAdded$,
        this.handlePosActivated$,
        this.closeInputFromUserClick$,
        this.closeInputWhenCustomWeightOptionNewlySelected$,
    ).pipe(
        scan((prevPos, newPos) => {
            if (!prevPos) {
                return newPos;
            } else if (!newPos || isSamePos(prevPos, newPos)) {
                return null;
            } else {
                return newPos;
            }
        }),
        shareReplay(1)
    );
}