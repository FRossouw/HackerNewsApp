import { createAction, props } from '@ngrx/store';
import { Comment } from 'src/app/models/comment';
import { Story } from 'src/app/models/story';
import { User } from 'src/app/models/user';

// Get Single Story
export const getStory = createAction('[News] Get Story', props<{ storyID: string }>());
export const getStoryComplete = createAction('[News] Get Story Complete', props<{ story: Story }>());

// Get Multiple Stories
export const getStories = createAction('[News] Get Stories', props<{ storyIds: string[], storyList: Story[] }>());
export const getStoriesComplete = createAction('[News] Get Stories Complete', props<{ stories: Story[] }>());

// Get Top Stories
export const getTopStories = createAction('[News] Get Top Stories');
export const getTopStoriesComplete = createAction('[News] Get Top Stories Complete', props<{ storyIds: string[] }>());

// Get Comments
export const getComments = createAction('[News] Get Comments', props<{ commentIds: string[] }>());
export const getCommentsComplete = createAction('[News] Get Comments Complete', props<{ comments: Comment[] }>());

// Get User
export const getUser = createAction('[News] Get User', props<{ userId: string }>());
export const getUserComplete = createAction('[News] Get User Complete', props<{ user: User }>());
