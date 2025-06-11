import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { TripModule } from '../src/trip/trip.module';
import { TripsService } from '../src/trip/trip.service';

describe('TripController (e2e)', () => {
  let app: INestApplication<App>;
  let tripService = { getTrips: (origin, destination) => ['test'] };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TripModule, AppModule],
    })
      .overrideProvider(TripsService)
      .useValue(tripService)
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

it('/trips (GET)', () => {
  return request(app.getHttpServer())
    .get('/trips')
    .expect(200)
    .expect(tripService.getTrips('ATL', 'LAX'))
});

afterAll(async () => {
  await app.close();
});
});
