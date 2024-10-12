import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from './components/home/home.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'chat', canActivate: [AuthGuard], component: ChatComponent },
    {
        path: 'chat/:receiverId',
        canActivate: [AuthGuard],
        component: ChatComponent,
    },
    {
        path: 'createPost',
        canActivate: [AuthGuard],
        component: AddPostComponent,
    },
    { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
    {
        path: 'profile/:userId',
        canActivate: [AuthGuard],
        component: ProfileComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
