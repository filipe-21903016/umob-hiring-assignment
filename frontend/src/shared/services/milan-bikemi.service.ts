import { Injectable } from '@angular/core';
import { GbfsService } from './gbfs.service';

@Injectable({
  providedIn: 'root',
})
export class MilanBikemiService extends GbfsService {
  constructor() {
    super('https://gbfs.urbansharing.com/bikemi.com');
  }
}
