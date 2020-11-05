import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Story } from 'src/app/models/story';
import { getStories, getStoriesComplete, getTopStories } from 'src/app/store/actions/news.actions';
import { NewsState, selectStories, selectTopStories, selectLoading } from 'src/app/store/reducers/news.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  loading$: Observable<boolean>;
  stories$: Observable<Story[]>;
  topStories$: Observable<string[]>;
  topStoriesCount: number = 10;
  constructor(private newsStore: Store<NewsState>) { }

  ngOnInit(): void {
    this.loading$ = this.newsStore.pipe(
      select(selectLoading)
    );

    this.stories$ = this.newsStore.pipe(
      select(selectStories)
    );

    this.topStories$ = this.newsStore.pipe(
      select(selectTopStories)
    );

    // Get Top Stories
    this.newsStore.dispatch(getTopStories());
    var tempStories = [];

    this.topStories$.subscribe((stories) => {
      if ((stories) && (stories.length > 0)) {
        this.topStoriesCount = Math.min(10, stories.length);
        for (let i = 0; i < Math.min(10, stories.length); i++) {
          if (stories[i]) {
            tempStories.push(stories[i].toString());
          }
        } // end of for
        this.newsStore.dispatch(getStories({ storyIds: tempStories, storyList: [] }));
      } // end of if stories and stories.length
    }); // end of subscribe

  }
}
