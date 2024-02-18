import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import FreeBikeStatusResponse from '../models/free-bike-status-response.interface';
import { HttpClient } from '@angular/common/http';
import StationInformationResponse from '../models/station-information-response.interface';
import SystemPricingPlansResponse from '../models/system-pricing-plans-response.interface';

@Injectable({
  providedIn: 'root',
})
export abstract class GbfsService {
  private http = inject(HttpClient);
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  freeBikeStatus(): Observable<FreeBikeStatusResponse> {
    return this.http
      .get<FreeBikeStatusResponse>(`${this.baseUrl}/free_bike_status.json`)
      .pipe(tap((response) => console.log(response)));
  }

  stationInformation(): Observable<StationInformationResponse> {
    return this.http.get<StationInformationResponse>(
      `${this.baseUrl}/station_information.json`
    );
  }

  systemPricingPlans(): Observable<SystemPricingPlansResponse> {
    return this.http.get<SystemPricingPlansResponse>(
      `${this.baseUrl}/system_pricing_plans.json`
    );
  }
}
