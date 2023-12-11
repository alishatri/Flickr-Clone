import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs';
import { FlickrOutput, FlickrPhoto } from 'src/app/interfaces/flicker';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss'],
})
export class ImageDetailsComponent implements OnInit {
  imageDetails: any;
  id: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.apiService.imageDetails(this.id).subscribe(
        (data: any) => {
          this.imageDetails = ((flickerPhoto: FlickrPhoto) => {
            const photos = {
              id: this.id,
              url: `https://farm${flickerPhoto.farm}.staticflickr.com/${flickerPhoto.server}/${this.id}_${flickerPhoto.secret}`,
            };
            console.log(photos);
            return photos;
          })(data);
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
}
