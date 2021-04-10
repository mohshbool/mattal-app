export interface Mattal {
  _id: string;
  images: [
    {
      _id: string;
      filename: string;
      type: string;
      created_at: string;
    },
  ];
  name: string;
  area: string;
  maps_url: string;
  facilities: Facilities;
  is_todays_pick: boolean;
  last_todays_pick: string;
  created_at: string;
  rating: number;
  ratedByDevice: boolean;
}

export interface Facilities {
  supermarket: boolean;
  food: boolean;
}
