import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements OnChanges {
    @Input() currentSelection!: string;

    @Input() options!: string[];

    @Input() label!: string;

    @Output() selectionChanged = new EventEmitter<string>();

    isDropdownDisplayed = false;

    maxWidth!: number;

    constructor(private elementRef: ElementRef) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['options']) {
            this.maxWidth = this.options.reduce((currMax, option) => Math.max(currMax, option.length), 0) * 7;
        }
    }

    toggleDropdown(): void {
        this.isDropdownDisplayed = !this.isDropdownDisplayed;
    }

    handleSelection(item: string): void {
        this.toggleDropdown();
        this.selectionChanged.emit(item);
    }

    @HostListener('document:mousedown', ['$event'])
    onGlobalClick(event: Event): void {
        if (!this.elementRef.nativeElement?.contains(event.target)) {
            this.isDropdownDisplayed = false;
        }
    }
}