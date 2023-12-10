import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlickrPhoto } from 'src/app/interfaces/flicker';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss'],
})
export class ImageDetailsComponent implements OnInit {
  imageDetails: any;
  constructor(
    private activateRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}
  ngOnInit(): void {}
}
