import { Injectable } from '@angular/core';

import { publish, refCount } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class NotificationService {

  private _notification: BehaviorSubject<string> = new BehaviorSubject(null);
  readonly notification$: Observable<string> = this._notification.asObservable()
  .pipe(publish(), refCount());

  constructor() {}

  notify(message) {
    this._notification.next(message);
    setTimeout(() => this._notification.next(null), 3000);
  }
}
