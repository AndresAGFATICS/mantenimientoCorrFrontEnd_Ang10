import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Session } from 'src/app/publico/shared/modelo/Session';
import { Funcionario } from '../modelo/Funcionario';


/**
 * Servicio auxiliar para administrar el token y usuario almacenados cuando se hace un login.
 * Este servicio permite utilizar la información del usuario que se ha logueado desde cualquier lugar.
 * También tenemos un método para eliminar la información almacenada y posteriormente
 * regresar a la pantalla de login.
 */
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private localStorageService: any;
  private currentSession: Session = null;

  constructor(private router: Router) { 
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }
  loadSessionData(): Session {
    const sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <Session>JSON.parse(sessionStr) : null;
  }
  getCurrentSession(): Session {
    return this.loadSessionData();
  }
  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    sessionStorage.clear();
    localStorage.clear();
    location.reload();
    this.currentSession = null;
  }
  getCurrentUser(): Funcionario {
    const session: Session = this.getCurrentSession();

    return (session && session.funcionario) ? session.funcionario : null;
  }
  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  }
  getCurrentToken(): string {
    const session = this.getCurrentSession();
    return (session && session.access_token) ? session.access_token : null;
  }
  getRefreshToken(): string {
    const session = this.getCurrentSession();
    return (session && session.refresh_token) ? session.refresh_token : null;
  }
  logout(): void {
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }
}
