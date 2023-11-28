import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DefaultComponent } from './default.component';
import { ProductComponent } from 'src/app/modules/product/product.component';
import { HomeComponent } from 'src/app/modules/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule
  ]
})
export class DefaultModule { }
