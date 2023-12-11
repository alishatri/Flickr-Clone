export interface FlickrPhoto {
  farm: string;
  id: string;
  secret: string;
  server: string;
  title: string;
  originalsecret?: string;
  originalformat?: string;
}

export interface FlickrOutput {
  photos: {
    photo: FlickrPhoto[];
  };
}
