import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Story } from 'src/app/models/story';
import { Comment } from 'src/app/models/comment';
import { getComments, getStory, getStoryComplete } from 'src/app/store/actions/news.actions';
import { NewsState, selectComments, selectLoading, selectStories, selectStory } from 'src/app/store/reducers/news.reducer';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.less']
})
export class ItemComponent implements OnInit {

  id = '';
  loading$: Observable<boolean>;
  story$: Observable<Story>;
  comments$: Observable<Comment[]>;
  constructor(private activatedroute: ActivatedRoute, private newsStore: Store<NewsState>) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.loading$ = this.newsStore.pipe(
      select(selectLoading)
    );

    this.story$ = this.newsStore.pipe(
      select(selectStory)
    );

    this.comments$ = this.newsStore.pipe(
      select(selectComments)
    );

    // Get Story
    const tempComments = [];
    this.newsStore.dispatch(getStory({ storyID: this.id }));

    this.story$.subscribe((response) => {

      if (this.id && response) {
        if (response.kids) {
          for (let index = 0; index < Math.min(10, response.kids.length); index++) {
            if (response.kids[index]) {
              tempComments.push(response.kids[index].toString());
            }
          }
          this.newsStore.dispatch(getComments({ commentIds: tempComments, comments: [] }));
        }
      }

    });


  }

}
