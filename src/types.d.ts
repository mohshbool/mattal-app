export interface Mattal {
  name: string;
  area: string;
  images: string[];
  maps_url: string;
  facilities: Facilities;
  review: number;
}

export interface Facilities {
  supermarket: boolean;
  food: boolean;
}
