import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  private flickrUrl = 'https://www.flickr.com/services/feeds/photos_public.gne';


  get() {
    return this.http.jsonp(this.flickrUrl,'callback')
  }
}
