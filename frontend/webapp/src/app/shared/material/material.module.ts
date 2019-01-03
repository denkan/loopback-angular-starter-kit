import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  DateAdapter,
  // MatAutocompleteModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  // MatDialogModule,
  MatTabsModule,
  // MatMenuModule,
  MatIconModule,
  // MatExpansionModule,
  MatToolbarModule,
  MatCardModule,
  MatSnackBarModule,
  // MatDatepickerModule,
  // MatNativeDateModule,
  // MatCheckboxModule,
  // MatSelectModule,
  // MatTooltipModule,
  MatProgressSpinnerModule,
  // MatSlideToggleModule,
  // MatDividerModule,
  // MatSliderModule,
  MatListModule,
  MatRippleModule,
  MatTableModule,
} from '@angular/material';

import { CustomDatePickerAdapter } from './custom-date-picker-adapter';

export const materialModules = [
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  MatFormFieldModule,
  // MatAutocompleteModule,
  MatButtonModule,
  // MatDialogModule,
  MatTabsModule,
  // MatMenuModule,
  MatIconModule,
  // MatExpansionModule,
  MatToolbarModule,
  MatCardModule,
  // MatDatepickerModule,
  // MatNativeDateModule,
  // MatCheckboxModule,
  // MatSelectModule,
  // MatTooltipModule,
  MatProgressSpinnerModule,
  // MatSlideToggleModule,
  // MatDividerModule,
  // MatSliderModule,
  MatSnackBarModule,
  MatListModule,
  MatRippleModule,
  MatTableModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...materialModules,
  ],
  providers: [
    { provide: DateAdapter, useClass: CustomDatePickerAdapter },
  ],
  exports: [
    ...materialModules,
  ]
})
export class MaterialModule { }
