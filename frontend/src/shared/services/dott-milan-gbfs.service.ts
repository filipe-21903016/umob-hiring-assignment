import { Injectable } from '@angular/core';
import { GbfsService } from './gbfs.service';

@Injectable({
  providedIn: 'root',
})
export class DottMilanGbfsService extends GbfsService {
  constructor() {
    super('https://gbfs.api.ridedott.com/public/v2/milan');
  }
}
