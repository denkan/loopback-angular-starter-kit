import { Component, Input, Type, TemplateRef, Output, EventEmitter } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-modal-title',
  template: `
    <header class="d-flex align-items-center pl-05 pr-1 bg-primary text-white"
      [class.justify-content-between]="!isCenter"
      [class.justify-content-center]="isCenter"
      [class.py-1]="!hasIcons"
      [class.py-05]="hasIcons"
      [ngClass]="headerClass"
    >
      <div class="d-flex align-items-center">
        <button mat-icon-button class="back"
          *ngIf="showBack"
          (click)="onGoBack()"
        ><i class="fa fa-chevron-left"></i></button>
        <h2 class="h4 m-0 p-0 pl-05"><ng-content></ng-content></h2>
      </div>

      <ng-template #defaultRightItems>
        <button mat-icon-button
          *ngIf="showClose"
          (click)="dialogRef.close()"
        ><i class="fa fa-times"></i></button>
      </ng-template>

      <ng-container
        *ngTemplateOutlet="rightItemsTemplate ? rightItemsTemplate : defaultRightItems">
      </ng-container>

  </header>
    `,
  styles: [`

    :host { display: block; }
  `],
})
export class ModalTitleComponent {
  @Input() dialogRef: MatDialogRef<Type<any>>;
  @Input() close = true;
  @Input() center = false;
  @Input() headerClass = null;
  @Input() rightItemsTemplate: TemplateRef<any>;
  @Input() preventGoBack = false;
  @Output() goBack = new EventEmitter();


  get showClose() {
    return this.close;
  }

  get showBack() {
    return !this.close && !this.center;
  }

  get hasIcons() {
    return this.showClose || this.showBack;
  }

  get isCenter() {
    return !this.close && this.center;
  }

  constructor() { }


  onGoBack() {
    this.goBack.emit(this.dialogRef);
    if(!this.preventGoBack) this.dialogRef.close();
  }
}
