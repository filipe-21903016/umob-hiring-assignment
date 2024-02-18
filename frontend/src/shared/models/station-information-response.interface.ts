export default interface StationInformationResponse {
  data: {
    stations: {
      station_id: string;
      name: string;
      lat: number;
      lon: number;
      capacity: number;
      vehicle_capacity: {
        bike: number;
      };
    }[];
  };
}