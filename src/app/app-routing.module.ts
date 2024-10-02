import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'chat', canActivate: [AuthGuard], component: ChatComponent },
    { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
