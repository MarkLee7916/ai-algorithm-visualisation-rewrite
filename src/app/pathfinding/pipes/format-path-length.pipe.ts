import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatPathLength'
})
export class FormatPathLengthPipe implements PipeTransform {
    transform(value: number): string {
        if (!value || value === Number.POSITIVE_INFINITY) {
            return "N/A";
        } else {
            return value.toString();
        }
    }

}