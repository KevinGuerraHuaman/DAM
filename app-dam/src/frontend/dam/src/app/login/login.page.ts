import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonButton,
         IonButtons, IonLabel, IonList, IonItem, IonText, IonMenuButton
} from '@ionic/angular/standalone';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonRow, IonCol, IonButton, IonButtons, IonLabel, IonList, IonItem, IonText, IonMenuButton]
})
export class LoginPage {
  submitted = false;
  username = '';
  password = '';

  constructor(private _loginService: LoginService) { }

  async onLogin() {
    if (!this.username || !this.password) {
      alert('Por favor complete todos los campos');
      return;
    }

    this.submitted = true;
    
    try {
      await this._loginService.login(this.username, this.password);
      // Si llega aquí, el login fue exitoso (el servicio ya navega a /home)
    } catch (error) {
      console.error('Error de login:', error);
      alert('Usuario o contraseña incorrectos');
      this.submitted = false;
    }
  }
}