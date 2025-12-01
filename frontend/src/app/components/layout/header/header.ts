import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatTreeModule } from '@angular/material/tree';
import { Auth } from '../../../services/auth';
import { Usuario } from '../../../interfaces/Usuario';
import { MatDialog } from '@angular/material/dialog';
import { Msgpanel } from '../msgpanel/msgpanel';
import { CommonModule } from '@angular/common';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

@Component({
	selector: 'app-header',
	imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatTooltipModule, RouterLink, RouterLinkActive, MatSidenavModule, MatTreeModule, MatMenuModule, CommonModule],
	templateUrl: './header.html',
	styleUrl: './header.scss',
})
export class Header {;
	constructor(
		private _authService: Auth,
		private _router: Router,
	) {}

	readonly dialog = inject(MatDialog);

	openDialog(title:string, message:string) {
		this.dialog.open(Msgpanel, {data:{ title, message }});
	}
	
	profile() { 
		console.log("Profile link clicked");
		setTimeout(() => {
				this._router.navigate(['/profile']).then(() => {
					window.location.reload();
				});
				}, 1200);
	}

	isAuthenticated(): boolean {
		// Implement your logic to check if the user is authenticated
		//console.log("Checking authentication status.", this._authService.isAuthenticated());
		return this._authService.isAuthenticated(); // Placeholder return value
	}

	userData(): Usuario {
		return this._authService.getUserData();
	}

	logout() {
		console.log("Logout clicked");
		// Implement your logout logic here
		const user: Usuario = this._authService.getUserData();
		console.log("User data for logout:", user);

		this._authService.logout( user ).subscribe({
			next: (response) => {
				console.log("Logout successful:", response);
				localStorage.removeItem('token');
				this.openDialog('Logout Successful', 'You have been logged out successfully.');
				setTimeout(() => {
				this._router.navigate(['/']).then(() => {
					window.location.reload();
				});
				}, 3600);
			},
			error: (error) => {
				console.error("Logout failed:", error);
				this.openDialog('Logout Failed', error.error.message || 'An unknown error occurred during logout.');
			}
		});
	}

}
