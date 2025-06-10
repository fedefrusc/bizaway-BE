export interface GetTripsQueryParams {
  origin: string;
  destination: string;
  sort_by?: 'fastest' | 'cheapest';
}

export interface TripInterface {
  _id: string;
  origin: string;
  destination: string;
  type: string;
  cost: number;
  duration: number; // in minutes
  display_name: string; // number of stops
}
export type TripsHttpResponse = TripInterface[];
