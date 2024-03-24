import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './components/dropdown.component';

@NgModule({
    declarations: [DropdownComponent],
    imports: [CommonModule],
    exports: [DropdownComponent],
})
export class SharedModule { }