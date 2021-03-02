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
  created_at: string;
}

export interface Facilities {
  supermarket: boolean;
  food: boolean;
}
