import { Observable, of } from "rxjs";
import { GridDimensions } from "../models/grid/grid";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class GridDimensionsService {
    // TODO: Calculate from screen dimensions and have action for dual grids
    private dimensions$: Observable<GridDimensions> = of({
        height: 20,
        width: 20
    });

    getStream() {
        return this.dimensions$;
    }
}