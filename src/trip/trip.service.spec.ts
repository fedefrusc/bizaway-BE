import { Test, TestingModule } from '@nestjs/testing';
import { TripsService } from './trip.service';
import { HttpService } from '@nestjs/axios';
import { getConnectionToken } from '@nestjs/mongoose';
import { of } from 'rxjs';
import { HttpException } from '@nestjs/common';

describe('TripsService', () => {
  let tripsService: TripsService;
  let httpService: HttpService;
  let connection: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripsService,
        {
          provide: HttpService,
          useValue: {
            axiosRef: { get: jest.fn() },
          },
        },
        {
          provide: getConnectionToken(),
          useValue: {
            model: jest.fn(),
          },
        },
      ],
    }).compile();

    tripsService = module.get<TripsService>(TripsService);
    httpService = module.get<HttpService>(HttpService);
    connection = module.get(getConnectionToken());
  });

  it('should be defined', () => {
    expect(tripsService).toBeDefined();
  });

  describe('getTrips', () => {
    it('should return sorted trips by fastest', async () => {
      const mockTrips = [
        {
          id: '1',
          origin: 'A',
          destination: 'B',
          type: 'flight',
          cost: 200,
          duration: 100,
        },
        {
          id: '2',
          origin: 'A',
          destination: 'B',
          type: 'flight',
          cost: 300,
          duration: 50,
        },
      ];
      httpService.axiosRef.get = jest.fn().mockResolvedValue({ data: mockTrips });
      const result = await tripsService.getTrips({ origin: 'A', destination: 'B', sort_by: 'fastest' });
      expect(result[0]).toEqual({
        _id: '2',
        origin: 'A',
        destination: 'B',
        type: 'flight',
        cost: 300,
        duration: 50,
        display_name: 'A to B (flight)',
      });
    });
    it('should return sorted trips by cheapest', async () => {
      const mockTrips = [
        {
          id: '1',
          origin: 'A',
          destination: 'B',
          type: 'flight',
          cost: 200,
          duration: 100,
        },
        {
          id: '2',
          origin: 'A',
          destination: 'B',
          type: 'flight',
          cost: 100,
          duration: 150,
        },
      ];
      httpService.axiosRef.get = jest.fn().mockResolvedValue({ data: mockTrips });
      const result = await tripsService.getTrips({ origin: 'A', destination: 'B', sort_by: 'cheapest' });
      expect(result[0]).toEqual({
        _id: '2',
        origin: 'A',
        destination: 'B',
        type: 'flight',
        cost: 100,
        duration: 150,
        display_name: 'A to B (flight)',
      });
    });
    it('should return unsorted trips if no sort_by', async () => {
      const mockTrips = [
        {
          id: '1',
          origin: 'A',
          destination: 'B',
          type: 'flight',
          cost: 200,
          duration: 100,
        },
        {
          id: '2',
          origin: 'A',
          destination: 'B',
          type: 'flight',
          cost: 100,
          duration: 150,
        },
      ];
      httpService.axiosRef.get = jest.fn().mockResolvedValue({ data: mockTrips });
      const result = await tripsService.getTrips({ origin: 'A', destination: 'B' });
      expect(result[0]).toEqual({
        _id: '1',
        origin: 'A',
        destination: 'B',
        type: 'flight',
        cost: 200,
        duration: 100,
        display_name: 'A to B (flight)',
      });
    });
    it('should throw if queryparams are missing', async () => {
      await expect(tripsService.getTrips(undefined as any)).rejects.toThrow();
      await expect(tripsService.getTrips({} as any)).rejects.toThrow();
    });
  });

  describe('saveTrip', () => {
    it('should save a trip', async () => {
      const saveMock = jest.fn().mockResolvedValue(undefined);
      const modelMock = jest.fn().mockImplementation(() => ({ save: saveMock }));
      connection.model = jest.fn().mockReturnValue(modelMock);
      await expect(tripsService.saveTrip({ _id: '1', origin: 'A', destination: 'B', type: 'flight', cost: 100, duration: 50, display_name: 'A to B' })).resolves.toBeUndefined();
      expect(saveMock).toHaveBeenCalled();
    });
    it('should throw HttpException on duplicate error', async () => {
      const error = { errorResponse: { errmsg: 'E11000 duplicate key error' } };
      const saveMock = jest.fn().mockRejectedValue(error);
      const modelMock = jest.fn().mockImplementation(() => ({ save: saveMock }));
      connection.model = jest.fn().mockReturnValue(modelMock);
      await expect(tripsService.saveTrip({ _id: '1', origin: 'A', destination: 'B', type: 'flight', cost: 100, duration: 50, display_name: 'A to B' })).rejects.toThrow(HttpException);
    });
  });

  describe('listTrips', () => {
    it('should return mapped trips', async () => {
      const trips = [
        { _id: '1', origin: 'A', destination: 'B', type: 'flight', cost: 100, duration: 50, display_name: 'A to B' },
      ];
      const execMock = jest.fn().mockResolvedValue(trips);
      const findMock = jest.fn().mockReturnValue({ exec: execMock });
      connection.model = jest.fn().mockReturnValue({ find: findMock });
      const result = await tripsService.listTrips();
      expect(result[0]._id).toBe('1');
    });
  });

  describe('deleteTrip', () => {
    it('should delete a trip', async () => {
      const execMock = jest.fn().mockResolvedValue({ deletedCount: 1 });
      const deleteOneMock = jest.fn().mockReturnValue({ exec: execMock });
      connection.model = jest.fn().mockReturnValue({ deleteOne: deleteOneMock });
      await expect(tripsService.deleteTrip('1')).resolves.toBeUndefined();
    });
    it('should throw HttpException if trip not found', async () => {
      const execMock = jest.fn().mockResolvedValue({ deletedCount: 0 });
      const deleteOneMock = jest.fn().mockReturnValue({ exec: execMock });
      connection.model = jest.fn().mockReturnValue({ deleteOne: deleteOneMock });
      await expect(tripsService.deleteTrip('1')).rejects.toThrow(HttpException);
    });
    it('should throw if id param is invalid', async () => {
      const deleteOneMock = jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue({ deletedCount: 0 }) });
      connection.model = jest.fn().mockReturnValue({ deleteOne: deleteOneMock });
      await expect(tripsService.deleteTrip(undefined as any)).rejects.toThrow();
      await expect(tripsService.deleteTrip('')).rejects.toThrow();
    });
  });
});
