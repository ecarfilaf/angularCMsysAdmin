import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/Usuario';

@Injectable({
	providedIn: 'root'
})

export class Auth {
	private configUrl: string | "";
	private _isAuthenticated = new BehaviorSubject<boolean>(false);

	constructor(private http: HttpClient) {
		this.configUrl = environment.apiUrl + '/auth';
		this.checkToken();
	}

	login(user: Usuario): Observable<any> {
		// console.log('Auth Service - Login called with user:', user);
		// console.log('Auth Service - return : ', this.configUrl + '/login');
		return this.http.post(`${this.configUrl}/login`, user);
	}

	logout(user: Usuario): Observable<any> {
		console.log('Auth Service - Logout called with user:', user);
		console.log('Auth Service - return : ', this.configUrl + '/logout');
		return this.http.post(`${this.configUrl}/logout`, user);
	}

	getToken(): string | null {
		try {
			return localStorage.getItem('token');
		} catch (error) {
			return null;
		}
	}

	private checkToken(): void {
		if (this.getToken()) {
			// console.log("Token found", this.getToken());
			this._isAuthenticated.next(true);
		} else {
			// console.log("No token found");
			this._isAuthenticated.next(false);
		}
		console.log("isAuthenticated:", this._isAuthenticated.value);
	}

	isAuthenticated(): boolean {
		return this._isAuthenticated.value;
	}

	getUserData(): Usuario {
		const token = localStorage.getItem('token');
		if (token) {
			const payload = token.split('.')[1];
			// La carga útil puede no ser un string JSON válido, así que hay que decodificarla
			// La función atob decodifica base64
			const decodedPayload = JSON.parse(atob(payload));
			// console.log('Decoded',decodedPayload);
			return decodedPayload as Usuario;
		} else {
			console.log('No token found');
			return {} as Usuario;
		}
	}
}