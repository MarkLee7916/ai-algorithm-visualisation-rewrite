import { Observable, of, tap } from "rxjs";
import { GridDimensions } from "../models/grid/grid";
import { Inject, Injectable } from "@angular/core";
import { BridgeService } from "./bridge";
import { bridgeFromGridDimensions } from "../pathfinding.tokens";

@Injectable({
    providedIn: 'root'
})
export class GridDimensionsService {
    constructor(@Inject(bridgeFromGridDimensions) private bridgeToOtherStreams: BridgeService<GridDimensions>) {
        this.getStream().subscribe()
    }

    // TODO: Calculate from screen dimensions and have action for dual grids
    private dimensions$: Observable<GridDimensions> = of({
        height: 20,
        width: 20
    }).pipe(
        tap(dimensions => this.bridgeToOtherStreams.next(dimensions))
    );

    getStream() {
        return this.dimensions$;
    }
}