import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { StompService } from './_services/stomp.service';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './components/chat/chat.component';
import { DatePipe } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { envrionment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ChatComponent,
        HomeComponent,
        PostComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
    providers: [
        httpInterceptorProviders,
        provideHttpClient(),
        StompService,
        DatePipe,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
