import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FlickrPhoto, FlickrOutput } from '../interfaces/flicker';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  prevKeyword: string | undefined;
  pageNumber!:number;

  constructor(private http: HttpClient) {}

  search_keyword(keyword: string) {
    if (this.prevKeyword === keyword) {
      this.pageNumber++;
    } else {
      this.pageNumber = 1;
    }
    this.prevKeyword = keyword;
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${environment.apiKey.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=12&page=${this.pageNumber}`;

    return this.http.get(url).pipe(
      map((data) => {
        const flickrOutput = data as FlickrOutput;
        const apiArr: any[] = [];
        flickrOutput.photos.photo.forEach((flickerPhoto: FlickrPhoto) => {
          const photos = {
            url: `https://farm${flickerPhoto.farm}.staticflickr.com/${flickerPhoto.server}/${flickerPhoto.id}_${flickerPhoto.secret}`,
            title: flickerPhoto.title,
          };
          apiArr.push(photos);
        });
        return apiArr;
      })
    );
  }
}
