import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Story } from 'src/app/models/story';
import { Comment } from 'src/app/models/comment';
import { User } from 'src/app/models/user';
import * as fromActions from '../actions/news.actions';


export const newsFeatureKey = 'news';

export interface NewsState {
  Loading: boolean;
  Story: Story;
  Stories: Story[];
  User: User;
  Comments: Comment[];
  TopStories: string[];
}

export const initialState: NewsState = {
  Loading: false,
  Story: {} as Story,
  Stories: [],
  User: {} as User,
  Comments: [],
  TopStories: []
};

export const newsReducer = createReducer(
  initialState,
  // Get Single Story
  on(fromActions.getStory, state => ({
    ...state,
    Loading: true
  })),
  on(fromActions.getStoryComplete, (state, { story }) => ({
    ...state,
    Loading: false,
    Story: story
  })),
  // Get Multiple Stories
  on(fromActions.getStories, (state, { storyList }) => ({
    ...state,
    Loading: true,
    Stories: storyList
  })),
  on(fromActions.getStoriesComplete, (state, { stories }) => ({
    ...state,
    Loading: false,
    Stories: [...stories]
  })),
  // Get Top Stories
  on(fromActions.getTopStories, state => ({
    ...state,
    Loading: true
  })),
  on(fromActions.getTopStoriesComplete, (state, { storyIds }) => ({
    ...state,
    Loading: false,
    TopStories: [...storyIds]
  })),
  // Get Comments
  on(fromActions.getComments, (state, { comments }) => ({
    ...state,
    Loading: true,
    Comments: comments
  })),
  on(fromActions.getCommentsComplete, (state, { comments }) => ({
    ...state,
    Loading: false,
    Comments: [...comments]
  })),
  // Get User
  on(fromActions.getUser, state => ({
    ...state,
    Loading: true
  })),
  on(fromActions.getUserComplete, (state, { user }) => ({
    ...state,
    Loading: false,
    User: user
  })),
);

export function reducer(state: NewsState | undefined, action: Action) {
  return newsReducer(state, action);
}

export const selectFeature = createFeatureSelector<any, NewsState>('newsState');

export const selectLoading = createSelector(
  selectFeature,
  (state: NewsState) => state.Loading
);

export const selectStory = createSelector(
  selectFeature,
  (state: NewsState) => state.Story
);

export const selectStories = createSelector(
  selectFeature,
  (state: NewsState) => state.Stories
);

export const selectUser = createSelector(
  selectFeature,
  (state: NewsState) => state.User
);

export const selectComments = createSelector(
  selectFeature,
  (state: NewsState) => state.Comments
);

export const selectTopStories = createSelector(
  selectFeature,
  (state: NewsState) => state.TopStories
);
