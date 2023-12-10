import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  images: any;
  key: string | undefined;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  onSearch(event: any) {
    this.key = event.target.value.toLowerCase();
    if (this.key && this.key.length > 0) {
      this.apiService.search_keyword(this.key).subscribe(
        (data) => {
          this.images = data;
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onScroll() {
    if (this.key && this.key.length > 0) {
      this.apiService.search_keyword(this.key).subscribe(
        (data) => {
          this.images = this.images.concat(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
