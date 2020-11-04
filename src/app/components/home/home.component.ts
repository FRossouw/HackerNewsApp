import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Server } from 'http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Story } from 'src/app/models/story';
import { NewsReaderService } from 'src/app/services/news-reader.service';
import { selectTopStories, State } from 'src/app/store/reducers/news.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  topStories$: Observable<Story[]>;
  constructor(private newsStore: Store<State>, private service: NewsReaderService) { }

  ngOnInit(): void {
    this.topStories$ = this.newsStore.pipe(
      select(selectTopStories)
    );

    let coms = this.service.getComments(['2922097', '2922429', '2924562', '2922709', '2922573']);
    console.log(coms)

    let sstory = this.service.getStories(['9129911', '9129199', '9127761', '9128141', '9128264']);
    console.log(sstory)


  }

}
