export default interface FreeBikeStatusResponse {
  data: {
    bikes: {
      lat: number;
      long: number;
      is_disabled: boolean;
      is_reserved: boolean;
      current_range_meters: number;
      current_fuel_percent: number;
    }[];
  };
}
