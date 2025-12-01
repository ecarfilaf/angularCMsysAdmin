import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../../services/auth';
import { Usuario } from '../../../interfaces/Usuario';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, } from '@angular/material/dialog';
import { Msgpanel } from '../../layout/msgpanel/msgpanel';

@Component({
	selector: 'app-auth-sign-in',
	imports: [FormsModule, MatButtonModule, MatIconModule, RouterLink, RouterLinkActive],
	templateUrl: './auth-sign-in.html',
	styleUrl: './auth-sign-in.scss',
})

export class AuthSignIn implements OnInit {

	readonly dialog = inject(MatDialog);

	openDialog(title:string, message:string) {
		this.dialog.open(Msgpanel, {data:{ title, message }});
	}

	email: string = '';
	password: string = '';
	loading: boolean = false;
	message: string = '';

	constructor(
		private _authService: Auth,
		private _router: Router,
	) { }

	ngOnInit(): void { }

	login(): void {

		// Implement login logic here

		const user: Usuario = {
			UsuRut: 0,
			UsuDv: '',
			UsuNombres: '',
			UsuAPaterno: '',
			UsuAMaterno: '',
			UsuUsuario: this.email.split('@')[0],
			UsuClave: this.password,
			CodEstado: 0,
			CodTipoUsuario: 0,
			FecVigencia: new Date(),
			UsuEmail: this.email,
			UsuAvatar: '',
			FecIngReg: null,
			UsuIngReg: '',
			FunIngReg: '',
			FecModReg: null,
			UsuModReg: '',
			FunModReg: ''
		}
		this.loading = true;

		// Simulate a login delay
		this._authService.login({ user } as any).subscribe({
			next: (response: any) => {
				// console.log('Login successful:', response);
				this.loading = false;
				const token = response.token;
				this.openDialog('Login Successful', 'You have been logged in successfully.');
				// Store the token as needed, e.g., in localStorage
				localStorage.setItem('token', token);
				setTimeout(() => {
				this._router.navigate(['/']).then(() => {
					window.location.reload();
				});
				}, 3600);
			},
			error: (error) => {
				// console.error('Login failed:', error);
				this.openDialog('Login Failed', error.error.message || 'An unknown error occurred during login.');
				this.loading = false;
			}
		});
	}
}

