import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PolicyInfoComponent } from './policy-info/policy-info.component';
import { FaqComponent } from './faq/faq.component';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    AboutUsComponent,
    ContactUsComponent,
    PolicyInfoComponent,
    FaqComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
