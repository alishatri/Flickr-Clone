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
  constructor(
    private activateRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}

  imageDetails: any;

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: any) => {
      this.apiService.imageDetails(params.id).subscribe((data) => {
        this.imageDetails = data;

        
        console.log('Image details',this.imageDetails);
        
      });
    });
  }
}
