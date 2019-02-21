import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRouteModule } from './app-route.module';
import { SharedModule } from './shared/shared.module';
import { AddPersonComponent } from './add-person/add-person.component';


@NgModule({
  declarations: [
    ...AppRouteModule.Components,
    AppComponent,
    AddPersonComponent
  ],
  imports: [
    BrowserModule,   
    BrowserAnimationsModule,
    SharedModule,
    AppRouteModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddPersonComponent]
})
export class AppModule { }
//https://auth0.com/blog/creating-beautiful-apps-with-angular-material/
