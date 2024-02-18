export default interface SystemPricingPlansResponse {
  data: {
    plans: {
      price: number;
      per_min_pricing: {
        rate: number;
      }[];
    }[];
  };
}
