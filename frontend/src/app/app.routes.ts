import { Routes } from '@angular/router';	
import { AuthSignIn } from './components/auth/auth-sign-in/auth-sign-in';
import { AuthSingUp } from './components/auth/auth-sing-up/auth-sing-up';
import { Header } from './components/layout/header/header';
import { Home } from './components/layout/home/home';
import { Profile } from './components/user/profile/profile';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
	{	path: '', component: Header,
		children: [
			{ path: '', component: Home },
			{ path: 'signin', component: AuthSignIn },
			{ path: '**', redirectTo: '/' }
	] },
	{	path: 'signin', component: Header,
		children: [
			{ path: 'signin', component: AuthSignIn },
			{ path: '**', redirectTo: '/' }
	] },
	{	path: 'signup', component: Header,
		children: [
			{ path: 'signup', component: AuthSingUp },
			{ path: '**', redirectTo: '/' }
	] },
	{	path: 'profile', component: Header,
		canActivateChild: [authGuard],
		children: [
			{ path: 'profile', component: Profile },
			{ path: '**', redirectTo: '/' }
	] }
];
