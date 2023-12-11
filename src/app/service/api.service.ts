import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FlickrPhoto, FlickrOutput } from '../interfaces/flicker';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  prevKeyword: string | undefined;
  pageNumber!: number;
  image: any;
  url = 'https://www.flickr.com/services/rest/';
  constructor(private http: HttpClient) {}

  search(keyword: string) {
    if (this.prevKeyword === keyword) {
      this.pageNumber++;
    } else {
      this.pageNumber = 1;
    }
    this.prevKeyword = keyword;
    const url = `${this.url}?method=flickr.photos.search&api_key=${environment.apiKey.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=12&page=${this.pageNumber}`;
    return this.http.get(url).pipe(
      map((data) => {
        const flickrOutput = data as FlickrOutput;
        const apiArr: any[] = [];
        flickrOutput.photos.photo.forEach((flickerPhoto: FlickrPhoto) => {
          const photos = {
            id: flickerPhoto.id,
            url: `https://farm${flickerPhoto.farm}.staticflickr.com/${flickerPhoto.server}/${flickerPhoto.id}_${flickerPhoto.secret}`,
            title: flickerPhoto.title,
          };
          apiArr.push(photos);
        });
        return apiArr;
      })
    );
  }

  imageDetails(photoId: string) {
    const getInfoUrl = `${this.url}?method=flickr.photos.getInfo&api_key=${environment.apiKey.key}&photo_id=${photoId}&format=json&nojsoncallback=1`;
    return this.http.get(getInfoUrl);
  }

  photoUrl(data: FlickrPhoto) {
    return `https://farm${data.farm}.staticflickr.com/${data.server}/${data.id}_${data.originalsecret}_o.${data.originalformat}`;
  }
}
