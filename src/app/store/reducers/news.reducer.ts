import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Story } from 'src/app/models/story';
import * as fromAction from '../actions/news.actions';


export const newsFeatureKey = 'news';

export interface State {
  loading: boolean;
  loaded: boolean;
  story: Story;
  storiesTop: Story[];
  comments: Comment[];
}

export const initialState: State = {
  loading: false,
  loaded: false,
  story: {
    by: 'dhouston',
    descendants: '71',
    id: '8863',
    kids: [
      '9224',
      '8917',
      '8952'
    ],
    score: '104',
    time: '1175714200',
    title: 'My YC app: Dropbox - Throw away your USB drive',
    type: 'story',
    url: 'http://www.getdropbox.com/u/2/screencast.html'
  } as Story,
  storiesTop: [],
  comments: []
};

export const newsReducer = createReducer(
  initialState,
  on(fromAction.getTopStories, state => ({
    ...state,
    loading: true
  })),
  on(fromAction.getTopStoriesSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    loaded: true,
    storiesTop: [...data]
  })),
  on(fromAction.getTopStoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: true,
    storiesTop: [...error]
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return newsReducer(state, action);
}

export const selectFeature = createFeatureSelector<any, State>('newsState');

export const selectLoading = createSelector(
  selectFeature,
  (state: State) => state.loading
);

export const selectLoaded = createSelector(
  selectFeature,
  (state: State) => state.loaded
);

export const selectTopStories = createSelector(
  selectFeature,
  (state: State) => state.storiesTop
);
