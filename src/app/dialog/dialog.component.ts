import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogService } from '../dialog.service';

export type ConfirmType = 'confirm' | 'info' | 'success' | 'warning' | 'error';
export type AcceptType = 'primary' | 'success' | 'warning' | 'danger';

export interface ConfirmOptions {
  open?: boolean;
  title?: string;
  content?: string;
  acceptText?: string;
  acceptType?: AcceptType;
  cancelText?: string;
  confirmType?: ConfirmType;
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent  {

  options$: Observable<ConfirmOptions>;

  constructor(private dialogService: DialogService) {
    this.options$ = this.dialogService.options$;
  }

  // getAcceptClass(acceptType: string): any {
  //   const classMap = {
  //     primary: 'btn-primary',
  //     success: 'btn-success',
  //     warning: 'btn-warning',
  //     danger: 'btn-danger',
  //   };
  //   return classMap[acceptType] as string ;
  // }

  close(value: boolean) {
    this.dialogService.close(value);
  }
}
