import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Story } from 'src/app/models/story';
import { selectTopStories, State } from 'src/app/store/reducers/news.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  topStories$: Observable<Story[]>;
  constructor(private newsStore: Store<State>) { }

  ngOnInit(): void {
    this.topStories$ = this.newsStore.pipe(
      select(selectTopStories)
    );

  }

}
