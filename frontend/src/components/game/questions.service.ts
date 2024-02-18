import { Injectable, inject } from '@angular/core';
import { DottMilanGbfsService } from '../../shared/services/dott-milan-gbfs.service';
import { combineLatest, map, tap } from 'rxjs';
import { BirdCascaisGbfsService } from '../../shared/services/bird-cascais-gbfs.service';
import { BirdLisboaGbfsService } from '../../shared/services/bird-lisboa-gbfs.service';
import { MilanBikemiService } from '../../shared/services/milan-bikemi.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  dottMilanService = inject(DottMilanGbfsService);
  birdCascaisService = inject(BirdCascaisGbfsService);
  birdLisboaService = inject(BirdLisboaGbfsService);
  donkeyDenHaagService = inject(MilanBikemiService);

  questions$ = combineLatest([
    this.dottMilanService.freeBikeStatus(),
    this.birdCascaisService.freeBikeStatus(),
    this.birdLisboaService.freeBikeStatus(),
    this.donkeyDenHaagService.stationInformation(),
    this.birdCascaisService.systemPricingPlans(),
  ]).pipe(
    tap((res) => console.log(res)),
    map(
      ([
        freeBikeStatusMilan,
        freeBikeStatusBirdCascais,
        freeBikeStatusBirdLisboa,
        milanBikemiStationInformation,
        systemPricingPlansBirdCascais,
      ]) => {
        const numberBikesDottMilan = freeBikeStatusMilan.data.bikes.length;
        const numberBikesBirdCascais =
          freeBikeStatusBirdCascais.data.bikes?.length ?? 0;
        const numberBikesBirdLisboa =
          freeBikeStatusBirdLisboa.data.bikes?.length ?? 0;
        const milanBikemiStations =
          milanBikemiStationInformation.data.stations.sort(
            (a, b) => b.capacity - a.capacity
          );
        const birdCascaisUnlockPrice =
          systemPricingPlansBirdCascais.data.plans.at(0)?.price ?? 0;
        const randomMilanBikemiStation =
          milanBikemiStationInformation.data.stations
            .sort(() => Math.random() - 0.5)
            .at(0);
        const randomMilanBikemiStationCapacity =
          randomMilanBikemiStation?.capacity ?? 0;
        const averageTravelledDistanceBirdLisboa = Math.round(
          freeBikeStatusBirdLisboa.data.bikes
            .map((bike) => bike.current_range_meters)
            .reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            ) / numberBikesBirdLisboa
        );
        const averageFuelPercentageBirdLisboa = Math.round(
          freeBikeStatusBirdLisboa.data.bikes
            .map((bike) => (bike?.current_fuel_percent ?? 0) * 100)
            .reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            ) / numberBikesBirdLisboa
        );

        return [
          {
            description: "What's the number of Dott bikes in Milan?",
            answer: numberBikesDottMilan.toString(),
            options: this.generateRandomOptions(numberBikesDottMilan, 4),
          },
          {
            description: 'Which provider has more free bikes?',
            answer:
              numberBikesBirdCascais >= numberBikesBirdLisboa
                ? 'Bird Cascais'
                : 'Bird Lisboa',
            options: ['Bird Cascais', 'Bird Lisboa'],
          },
          {
            description: 'Which station has the most bikes?',
            answer: milanBikemiStations.at(0)?.name ?? '',
            options: milanBikemiStations
              .slice(0, 4)
              .map((station) => station.name)
              .sort(() => Math.random() - 0.5),
          },
          {
            description: 'Whats the unlock price of Bird Cascais?',
            answer: birdCascaisUnlockPrice.toString(),
            options: [birdCascaisUnlockPrice.toString(), '5', '2', '10'].sort(
              () => Math.random() - 0.5
            ),
          },
          {
            description: `Whats the capacity of the station ${randomMilanBikemiStation?.name}?`,
            answer: randomMilanBikemiStationCapacity.toString(),
            options: this.generateRandomOptions(
              randomMilanBikemiStationCapacity,
              4
            ),
          },
          {
            description:
              'What is the average distance traveled by the currently available free bikes from Bird Lisboa?',
            answer: averageTravelledDistanceBirdLisboa.toString(),
            options: this.generateRandomOptions(
              averageTravelledDistanceBirdLisboa,
              4
            ),
          },
          {
            description:
              'What is the average fuel percentage of the currently available free bikes from Bird Lisboa?',
            answer: averageFuelPercentageBirdLisboa.toString(),
            options: this.generateRandomOptions(
              averageFuelPercentageBirdLisboa,
              4
            ),
          },
        ];
      }
    )
  );

  constructor() {}

  generateRandomOptions(answer: number, numberOfOptions: number) {
    let options: string[] = [];

    // Generate unique random options
    for (let i = 0; i < numberOfOptions - 1; i++) {
      let randomOption;
      do {
        randomOption = Math.floor(this.getRandomArbitrary(1, answer * 2));
      } while (
        options.includes(randomOption.toString()) ||
        randomOption === answer
      );
      options.push(randomOption.toString());
    }

    // Add the answer as one of the options
    options.push(answer.toString());

    // Shuffle the options
    options.sort(() => Math.random() - 0.5);

    return options;
  }

  getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
