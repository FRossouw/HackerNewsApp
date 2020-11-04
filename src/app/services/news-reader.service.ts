import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Story } from '../models/story';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class NewsReaderService {

  constructor(private http: HttpClient) { }

  getStory(storyId: string): Observable<Story> {
    return this.http.get<Story>(`${environment.api.url}${storyId}${environment.api.end}`);
  }

  getStories(stories: string[]): Story[] {
    const storyList = [];
    stories.forEach(storyId => {
      this.getComment(storyId).pipe(
        map(response => response)
      ).subscribe(story => storyList.push(story));
    });
    return storyList;
  }

  getStoriesTop(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.api.topStories}`);
  }

  getComment(commentId: string): Observable<Comment> {
    return this.http.get<Comment>(`${environment.api.url}${commentId}${environment.api.end}`);
  }

  getComments(comments: string[]): Comment[] {
    const commentList = [];
    comments.forEach(commentId => {
      this.getComment(commentId).pipe(
        map(response => response)
      ).subscribe(comment => commentList.push(comment));
    });
    return commentList;
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${environment.api.userUrl}${userId}${environment.api.end}`);
  }

}
