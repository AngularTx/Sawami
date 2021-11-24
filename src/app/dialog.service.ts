import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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
@Injectable({
  providedIn: 'root'
})


export class DialogService {
  readonly DEFAULT_OPTIONS: ConfirmOptions = {
    acceptText: 'Ok',
    cancelText: 'Cancel',
    acceptType: 'primary',
  };

  private optionsSubject$: Subject<ConfirmOptions> = new Subject<ConfirmOptions>();
  options$: Observable<ConfirmOptions> = this.optionsSubject$.asObservable();

  private resultChange$: Subject<boolean> = new Subject();

  constructor() { }

  confirm(options: ConfirmOptions = {}): Observable<boolean> {
    if (!('iconShape' in options)) {
      //options.iconShape = 'help';
    }

    if (!('iconClass' in options)) {
     // options.iconClass = 'is-highlight is-solid';
    }
    return this.create(options, 'confirm');
  }

 

  private simpleConfirm(options: ConfirmOptions = {}, confirmType: ConfirmType): Observable<boolean> {
    const iconsMap = {
      info: 'info-standard',
      success: 'success-standard',
      error: 'error-standard',
      warning: 'warning-standard',
    };

    const classMap = {
      info: 'is-info is-solid',
      success: 'is-success is-solid',
      error: 'is-error is-solid',
      warning: 'is-warning is-solid',
    };

    // options.iconShape = iconsMap[confirmType];
    // options.iconClass = classMap[confirmType];

    // if (!('cancelText' in options)) {
    //   options.cancelText = null;
    // }
    return this.create(options, confirmType);
  }

  private create(options: ConfirmOptions, confirmType: ConfirmType = 'confirm'): Observable<boolean> {
    this.optionsSubject$.next({
      ...this.DEFAULT_OPTIONS,
      ...options,
      open: true,
      confirmType,
    });

    this.resultChange$ = new Subject<boolean>();
    return this.resultChange$.asObservable();
  }


  close(accepted: boolean) {
    this.optionsSubject$.next({open: false});

    this.resultChange$.next(accepted);
    this.resultChange$.complete();
  }
}
