import { Injectable } from "@angular/core";
import { merge, fromEvent, map } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class MousePressService {
    getStream() {
        return this.isMouseDown$;
    }

    private isMouseDown$ = merge(fromEvent(document, 'mousedown'), fromEvent(document, 'mouseup')).pipe(
        map((event: Event) => (event as MouseEvent).buttons === 1)
    )
}
