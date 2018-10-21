import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {LayoutComponent} from './layout/layout.component';
import {BodyComponent} from './body/body.component';
import {CommonModule} from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {RegisterService} from './register/register.service';
import {ApiService, JwtService} from './core/services';
import { TokenInterceptorService } from './token-interceptor.service';

import {AuthGuard} from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import {provideForRootGuard} from '@angular/router/src/router_module';
import { FeedComponent } from './feed/feed.component';
import {UserService} from './core/services/user.service';
import { TagsComponent } from './feed/tags/tags.component';
import { ArticleListComponent } from './feed/article-list/article-list.component';
import { ArticlePreviewComponent } from './feed/article-list/article-preview/article-preview.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import {FeedService} from './feed/feed.service';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    BodyComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    SettingsComponent,
    FeedComponent,
    TagsComponent,
    ArticleListComponent,
    ArticlePreviewComponent,
    ArticleDetailComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    CommonModule,
    HttpClientModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    RegisterService, AuthGuard , ApiService, JwtService, UserService, TokenInterceptorService, FeedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
