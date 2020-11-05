import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Story } from '../models/story';
import { User } from '../models/user';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class NewsReaderService {

  constructor(private http: HttpClient) { }

  getStory(storyId: string): Observable<Story> {
    return this.http.get<Story>(`${environment.api.url}${storyId}${environment.api.end}`);
  }

  getStories(stories: string[]): Observable<Story[]> {
    const storyList = [];
    if (stories.length !== 0) {
      stories.forEach(storyId => {
        this.getStory(storyId).pipe(
          map(response => response)
        ).subscribe(story => storyList.push(story));
      });
    }
    return of(storyList);
  }

  getStoriesTop(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.api.topStories}`);
  }

  getComment(commentId: string): Observable<Comment> {
    return this.http.get<Comment>(`${environment.api.url}${commentId}${environment.api.end}`);
  }

  getComments(comments: string[]): Observable<Comment[]> {
    const commentList: Comment[] = new Array();
    if (comments) {
      comments.forEach(commentId => {
        this.getComment(commentId).pipe(
          map(response => response)
        ).subscribe(comment => commentList.push(comment));
      });
    }
    return of(commentList);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${environment.api.userUrl}${userId}${environment.api.end}`);
  }

}
