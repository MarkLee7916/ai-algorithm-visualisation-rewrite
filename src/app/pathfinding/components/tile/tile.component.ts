import { Component, ChangeDetectionStrategy, Input, SimpleChanges, EventEmitter, Output } from "@angular/core";
import { TypeOfDataDisplayedOnTileOption } from "../../models/dropdown/dropdown-enums";
import { UncheckedObjMap } from "../../../shared/models/uncheckedObjMap";
import { TileAnimationFrame } from "../../models/grid/animation-frame-grid";
import { ReplaySubject, Subject, combineLatest, filter, map, merge, withLatestFrom } from "rxjs";
import { MousePressService } from "../../services/mouse-press.service";

@Component({
    selector: 'app-tile',
    templateUrl: './tile.component.html',
    styleUrls: ['./tile.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileComponent {
    domUpdates = {
        setStart$: new ReplaySubject<boolean>(1),
        setGoal$: new ReplaySubject<boolean>(1),
        setIsBarrier$: new ReplaySubject<boolean>(1),
        setWeight$: new ReplaySubject<number>(1),
        setPathLengthFromStart$: new ReplaySubject<number>(1),
        setHeuristicDistFromGoal$: new ReplaySubject<number>(1),
        setTypeOfDataToDisplay$: new ReplaySubject<TypeOfDataDisplayedOnTileOption>(1),
        setWillDisplayTooltipOnMouseOver$: new ReplaySubject<boolean>(1),
        setAnimationFrame$: new ReplaySubject<TileAnimationFrame>(1),
        setIsMouseOver$: new ReplaySubject<boolean>,
        startDrag$: new ReplaySubject<Event>,
        startDrop$: new ReplaySubject<Event>,
        startMouseDown$: new ReplaySubject<void>(1)
    };

    @Input() set isStart(value: boolean) {
        this.domUpdates.setStart$.next(value);
    }

    @Input() set isGoal(value: boolean) {
        this.domUpdates.setGoal$.next(value);
    }

    @Input() set isBarrier(value: boolean) {
        this.domUpdates.setIsBarrier$.next(value);
    }

    @Input() set weight(value: number) {
        this.domUpdates.setWeight$.next(value);
    }

    @Input() set pathLengthFromStart(value: number) {
        this.domUpdates.setPathLengthFromStart$.next(value);
    }

    @Input() set heuristicDistFromGoal(value: number) {
        this.domUpdates.setHeuristicDistFromGoal$.next(value);
    }

    @Input() set typeOfDataToDisplay(value: TypeOfDataDisplayedOnTileOption) {
        this.domUpdates.setTypeOfDataToDisplay$.next(value);
    }

    @Input() set willDisplayTooltipOnMouseOver(value: boolean) {
        this.domUpdates.setWillDisplayTooltipOnMouseOver$.next(value);
    }

    @Input() set animationFrame(value: TileAnimationFrame) {
        this.domUpdates.setAnimationFrame$.next(value);
    }

    animationFrameToColor = new UncheckedObjMap<TileAnimationFrame, string>([
        [TileAnimationFrame.Blank, 'white'],
        [TileAnimationFrame.Expanded, '#7FCDCD'],
        [TileAnimationFrame.FinalPath, '#EFC050'],
        [TileAnimationFrame.Visited, '#F7CAC9'],
        [TileAnimationFrame.BeingAddedToAgenda, '#F7CAC9'],
        [TileAnimationFrame.BeingExpanded, '#7FCDCD'],
    ]);

    typeOfDataDisplayedOnTileToTextColor = new UncheckedObjMap<TypeOfDataDisplayedOnTileOption, string>([
        [TypeOfDataDisplayedOnTileOption.PathLengthsFromStart, '#006633'],
        [TypeOfDataDisplayedOnTileOption.Weights, 'var(--secondary-color)'],
        [TypeOfDataDisplayedOnTileOption.HeuristicDists, 'red'],
    ]);

    animationFramesToHighlight = [
        TileAnimationFrame.BeingAddedToAgenda,
        TileAnimationFrame.BeingExpanded,
    ];

    isMouseOver$ = merge(
        this.domUpdates.setIsMouseOver$,
        this.domUpdates.startDrag$.pipe(map(() => false))
    )

    shouldTileBeHighlighted$ = this.domUpdates.setAnimationFrame$.pipe(
        map(frame => this.animationFramesToHighlight.includes(frame))
    );

    backgroundColor$ = combineLatest([this.domUpdates.setAnimationFrame$, this.domUpdates.setIsBarrier$],
        (frame, isBarrier) => isBarrier ? 'gray' : this.animationFrameToColor.get(frame)
    );

    textToDisplay$ = combineLatest([this.domUpdates.setTypeOfDataToDisplay$, this.domUpdates.setWeight$, this.domUpdates.setPathLengthFromStart$, this.domUpdates.setHeuristicDistFromGoal$],
        (typeOfData, weight, pathLengthFromStart, heuristicDistFromGoal) => this.getTextToDisplay(typeOfData, weight, pathLengthFromStart, heuristicDistFromGoal)
    );

    shouldDisplayTooltip$ = combineLatest([this.domUpdates.setWillDisplayTooltipOnMouseOver$, this.isMouseOver$],
        (willDisplayTooltipOnMouseOver, isMouseOver) => willDisplayTooltipOnMouseOver && isMouseOver
    );

    pathLengthFromStart$ = this.domUpdates.setPathLengthFromStart$.pipe(
        map(length => this.getPathLengthToDisplay(length))
    );

    textColor$ = this.domUpdates.setTypeOfDataToDisplay$.pipe(
        map(typeOfData => this.typeOfDataDisplayedOnTileToTextColor.get(typeOfData))
    )

    @Output() drag = this.domUpdates.startDrag$;

    @Output() drop = this.domUpdates.startDrop$;

    @Output() activate =
        merge(
            this.isMouseOver$.pipe(
                withLatestFrom(this.mousePressService.stream$),
                filter(([isMouseOver, isMousePressed]) => isMouseOver && isMousePressed),
                map(() => { })
            ),
            this.domUpdates.startMouseDown$
        )

    constructor(private mousePressService: MousePressService) { }

    getTextToDisplay(typeOfData: TypeOfDataDisplayedOnTileOption, weight: number, pathLengthFromStart: number, heuristicDistFromGoal: number): string {
        if (typeOfData === TypeOfDataDisplayedOnTileOption.PathLengthsFromStart) {
            return this.getPathLengthToDisplay(pathLengthFromStart);
        } else if (typeOfData === TypeOfDataDisplayedOnTileOption.Weights) {
            return weight === 1 ? '' : weight.toString();
        } else if (typeOfData === TypeOfDataDisplayedOnTileOption.HeuristicDists) {
            return heuristicDistFromGoal.toString();
        } else {
            throw new Error('Tile display item not supported!');
        }
    }

    getPathLengthToDisplay(pathLengthFromStart: number) {
        return pathLengthFromStart !== Number.POSITIVE_INFINITY ? this.pathLengthFromStart.toString() : '∞'
    }
}