
import { Test } from '@nestjs/testing';
import { TripsController } from './trip.controller';
import { TripsService } from './trip.service';
import { HttpModule } from '@nestjs/axios';

describe('TripsController', () => {
  let tripsController: TripsController;
  let tripsService: TripsService;

  beforeEach(async () => {
   const moduleRef = await Test.createTestingModule({
        controllers: [TripsController],
        providers: [TripsService],
      }).compile();

    tripsController = moduleRef.get<TripsController>(TripsController);
    tripsService = moduleRef.get<TripsService>(TripsService);
  });

  describe('getTrips', () => {
    it('should return an array of trips', async () => {
      const result = [
        { _id: '1', origin: 'AFK', destination: 'NYC', type: 'flight', cost: 100, duration: 120, display_name: 'AFK to NYC' },
      ];
      jest.spyOn(tripsService, 'getTrips').mockImplementation(async () => result);
      expect(await tripsController.getTrips({origin: 'AFK', destination: 'NYC'})).toBe(result);
    });
  });
});
