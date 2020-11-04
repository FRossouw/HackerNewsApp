import { Action, createAction, props } from '@ngrx/store';
import { Story } from 'src/app/models/story';

// Load News
export const getNews = createAction('[News] Get News');
export const getNewsSuccess = createAction('[News] Get News Success', props<{ data: any }>());
export const getNewsFailure = createAction('[News] Get News Failure', props<{ error: any }>());

export const getTopStories = createAction('[News] Get Top Stories');
export const getTopStoriesSuccess = createAction('[News] Get Top Stories Success', props<{ data: Story[] }>());
export const getTopStoriesFailure = createAction('[News] Get Top Stories Failure', props<{ error: any }>());
