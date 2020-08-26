import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { GridLanguageComponent } from './grid-language/grid-language.component';
import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from './auth/loading/loading.component';
import { CreateNewComponent } from './grid-language/create-new/create-new.component';
import { EditComponent } from './grid-language/edit/edit.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { Router, ActivatedRoute } from '@angular/router';
import { UserNamePipe } from './pipe/username.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    GridLanguageComponent,
    HeaderComponent,
    LoadingComponent,
    CreateNewComponent,
    EditComponent,
    UserNamePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      progressBar: true,
    }),
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
