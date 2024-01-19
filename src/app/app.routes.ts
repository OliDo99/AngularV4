import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {LoginComponent} from './login/login.component'
import {RoutingComponent} from './routing/routing.component'

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'routing', component: RoutingComponent },
    { path: '',   redirectTo: '/login', pathMatch: 'full' }
];
