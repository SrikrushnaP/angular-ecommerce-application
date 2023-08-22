import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './header/top-nav/top-nav.component';
import { SecondaryNavComponent } from './header/secondary-nav/secondary-nav.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ContentLineOneComponent } from './home/content-line-one/content-line-one.component';
import { ContentLineTwoComponent } from './home/content-line-two/content-line-two.component';
import { ContentLineThreeComponent } from './home/content-line-three/content-line-three.component';
import { ContentLineFourComponent } from './home/content-line-four/content-line-four.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    TopNavComponent,
    SecondaryNavComponent,
    FooterComponent,
    SidebarComponent,
    CarouselComponent,
    ContentLineOneComponent,
    ContentLineTwoComponent,
    ContentLineThreeComponent,
    ContentLineFourComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TopNavComponent,
    SecondaryNavComponent,
    FooterComponent,
    SidebarComponent,
    CarouselComponent,
    ContentLineOneComponent,
    ContentLineTwoComponent,
    ContentLineThreeComponent,
    ContentLineFourComponent
  ]
})
export class LayoutModule { }
