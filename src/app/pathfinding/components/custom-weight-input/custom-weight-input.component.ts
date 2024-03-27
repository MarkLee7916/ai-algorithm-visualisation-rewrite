import {
    Component,
    EventEmitter,
    Output,
    ChangeDetectionStrategy,
} from '@angular/core';

@Component({
    selector: 'app-custom-weight-input',
    templateUrl: './custom-weight-input.component.html',
    styleUrls: ['./custom-weight-input.component.css',],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomWeightInputComponent {
    @Output() readonly submit = new EventEmitter<number>();

    @Output() readonly closeWithoutSubmitting = new EventEmitter<void>();

    hasUserEnteredInvalidInput = false;

    handleSubmit(customWeightStr: string): void {
        const customWeight = parseInt(customWeightStr, 10);

        if (!isNaN(customWeight) && customWeight > 0) {
            this.submit.emit(customWeight);
        } else {
            this.hasUserEnteredInvalidInput = true;
        }
    }

    handleCloseWithoutSubmitting(): void {
        this.closeWithoutSubmitting.emit();
    }
}