import { Routes } from '@angular/router';
import { AuthSignIn } from './components/auth/auth-sign-in/auth-sign-in';
import { AuthSingUp } from './components/auth/auth-sing-up/auth-sing-up';
import { Home } from './components/layout/home/home';
import { Profile } from './components/user/profile/profile';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
	{ path: '', component: Home },
	{ path: 'signin', component: AuthSignIn },
	{ path: 'signup', component: AuthSingUp },
	{
		path: 'profile', component: Profile,
		canActivate: [authGuard],
	},
	{path:'**', redirectTo: '/'}
];
