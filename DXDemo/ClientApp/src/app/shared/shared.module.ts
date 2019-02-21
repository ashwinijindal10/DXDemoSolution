import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploaderComponent } from './uploader/uploader.component';
import { AngularMaterialModule } from './angular-material.module';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    UploaderComponent,
    ConfirmationComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,

    //component
    UploaderComponent,
    SearchComponent
  ],
  entryComponents:[
    ConfirmationComponent
  ]
})
export class SharedModule {

}
