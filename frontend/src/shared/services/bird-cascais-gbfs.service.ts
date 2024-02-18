import { Injectable } from '@angular/core';
import { GbfsService } from './gbfs.service';

@Injectable({
  providedIn: 'root',
})
export class BirdCascaisGbfsService extends GbfsService {
  constructor() {
    super('https://mds.bird.co/gbfs/v2/public/cascais');
  }
}
