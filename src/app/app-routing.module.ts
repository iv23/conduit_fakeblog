import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {LayoutComponent} from './layout/layout.component';
import {FeedComponent} from './feed/feed.component';
import {ArticleDetailComponent} from './article-detail/article-detail.component';
import {EditorComponent} from './editor/editor.component';
import {SettingsComponent} from './settings/settings.component';

const routes: Routes = [
  {path: '', redirectTo: '/#/', pathMatch: 'full'},
  {path: '#', component: LayoutComponent},
  {path: '', component: FeedComponent, data: {parent: 'home'}},
  {path: 'profile/:username', component: FeedComponent, data: {parent: 'profile'}},
  {path: 'article/:slug', component: ArticleDetailComponent},
  {path: 'editor', component: EditorComponent},
  {path: 'editor/:slug', component: EditorComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
