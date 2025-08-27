import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { DispositivoService } from '../services/dispositivo.service';
import { ActivatedRoute, Router } from '@angular/router';

import { HumedadPipe } from '../pipes/humedad.pipe';

@Component({
  selector: 'app-listado-dispositivos',
  templateUrl: './listado-dispositivos.page.html',
  styleUrls: ['./listado-dispositivos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    CommonModule,HumedadPipe
  ]
})
export class ListadoDispositivosPage implements OnInit {

  dispositivo: any = null;
  dispositivoId: string = '';
  errorMessage: string = '';

  constructor(
    private dispositivoService: DispositivoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener el ID del dispositivo desde la URL
    this.dispositivoId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    
    if (this.dispositivoId) {
      this.cargarDetalleDispositivo();
    }
  }

  cargarDetalleDispositivo() {
    this.dispositivoService.getDispositivo(this.dispositivoId).subscribe({
      next: (res) => {
        this.dispositivo = res;
        console.log('Dispositivo cargado:', this.dispositivo);
      },
      error: (err) => {
        console.error('Error al obtener dispositivo', err);
        this.errorMessage = 'No se pudo cargar el dispositivo.';
      }
    });
  }

  toggleValvula() {
    this.dispositivoService.toggleValvula(this.dispositivoId).subscribe({
      next: (res) => {
        console.log('Válvula accionada:', res);
        alert(res.message); // Mostrar si se abrió o cerró
        // Recargar datos para actualizar la última medición
        this.cargarDetalleDispositivo();
      },
      error: (err) => {
        console.error('Error al accionar válvula', err);
        alert('Error al accionar la válvula');
      }
    });
  }

  verHistorial() {
    // Navegar a la página de mediciones del dispositivo
    this.router.navigate(['/mediciones', this.dispositivoId]);
  }
}