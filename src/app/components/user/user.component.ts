import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { getUser } from 'src/app/store/actions/news.actions';
import { NewsState, selectLoading, selectUser } from 'src/app/store/reducers/news.reducer';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {

  id: string = '';
  loading$: Observable<boolean>;
  user$: Observable<User>;
  constructor(private activatedroute: ActivatedRoute, private newsStore: Store<NewsState>) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.loading$ = this.newsStore.pipe(
      select(selectLoading)
    );

    this.user$ = this.newsStore.pipe(
      select(selectUser)
    );

    // Get User
    this.newsStore.dispatch(getUser({ userId: this.id }));

    this.user$.subscribe((response) => {
      console.log(response);
    });


  }

}
