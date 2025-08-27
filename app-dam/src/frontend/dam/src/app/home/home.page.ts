import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { DispositivoService } from '../services/dispositivo.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    RouterModule, IonList, IonItem, IonLabel, CommonModule
  ],
})
export class HomePage implements OnInit {

  dispositivos: any[] = [];   // Binding con el HTML
  errorMessage: string = "";

  constructor(private dispositivoService: DispositivoService) {}

  ngOnInit() {
  this.dispositivoService.getDispositivos().subscribe({
    next: (res) => {
      this.dispositivos = res;
    },
    error: (err) => {
      console.error('Error al obtener dispositivos', err);
      this.errorMessage = "No se pudo cargar la lista de dispositivos.";
    }
  });
}

  cargarDispositivos() {
    this.dispositivoService.getDispositivos().subscribe({
      next: (res:any) => {
        this.dispositivos = res;
      },
      error: (err) => {
        console.error('Error al obtener dispositivos', err);
        this.errorMessage = "No se pudo cargar la lista de dispositivos.";
      }
    });
  }
}