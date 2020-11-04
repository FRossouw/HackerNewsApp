import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Story } from 'src/app/models/story';
import { NewsReaderService } from 'src/app/services/news-reader.service';
import { NewsState } from 'src/app/store/reducers/news.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  topStories$: Observable<Story[]>;
  constructor(private newsStore: Store<NewsState>, private service: NewsReaderService) { }

  ngOnInit(): void {

  }

}
