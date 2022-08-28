import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateActiveUserService {
  update = new Subject<any>();

  constructor() {}
}
