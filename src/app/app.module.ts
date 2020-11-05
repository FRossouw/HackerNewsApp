import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Localization
import en from '@angular/common/locales/en';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';

// NG-Zorro Library
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzCardModule } from 'ng-zorro-antd/card';

// Components
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { HomeComponent } from './components/home/home.component';

// Store
import { ActionReducer, StoreModule } from '@ngrx/store';
import * as fromNews from '../app/store/reducers/news.reducer';
import { NewsEffects } from '../app/store/effects/news.effects';
import { EffectsModule } from '@ngrx/effects';
import { ItemComponent } from './components/item/item.component';
import { UserComponent } from './components/user/user.component';

registerLocaleData(en);

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    HomeComponent,
    ItemComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzPageHeaderModule,
    NzTypographyModule,
    NzListModule,
    NzProgressModule,
    NzCommentModule,
    NzCardModule,
    StoreModule.forRoot({newsState: fromNews.reducer}, { metaReducers: [debug] }),
    // StoreModule.forFeature(fromNews.newsFeatureKey, fromNews.reducer),
    // EffectsModule.forRoot([NewsEffects]),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([NewsEffects]),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
