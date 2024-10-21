import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { StompService } from './_services/stomp.service';
import {
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './components/chat/chat.component';
import { DatePipe } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { PostComponent } from './components/post/post.component';
import { environment } from '../environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AddPostComponent } from './components/add-post/add-post.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ProfileComponent } from './components/profile/profile.component';
import { NavComponent } from './components/nav/nav.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DetailPostComponent } from './components/detail-post/detail-post.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ChatComponent,
        HomeComponent,
        PostComponent,
        AddPostComponent,
        ProfileComponent,
        NavComponent,
        DetailPostComponent,
        EditProfileComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireStorageModule,
        ReactiveFormsModule,
        DialogModule,
        ButtonModule,
        PickerModule,
        BrowserAnimationsModule,
        MatDialogModule,
    ],
    providers: [
        httpInterceptorProviders,
        provideHttpClient(),
        StompService,
        DatePipe,
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
    ],
})
export class AppModule {}
