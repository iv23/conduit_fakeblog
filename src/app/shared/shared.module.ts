import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteButtonComponent } from './buttons/favourite-button/favourite-button.component';
import { FollowButtonComponent } from './buttons/follow-button/follow-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FavouriteButtonComponent, FollowButtonComponent],
  exports: [FavouriteButtonComponent, FollowButtonComponent]
})
export class SharedModule { }
