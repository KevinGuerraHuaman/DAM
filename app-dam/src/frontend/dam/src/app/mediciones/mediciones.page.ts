

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';

import { DispositivoService } from '../services/dispositivo.service';


import { HumedadPipe } from '../pipes/humedad.pipe';
import { ResaltarHumedadDirective } from '../directives/resaltar-humedad.directive';

@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel, CommonModule,
    HumedadPipe, ResaltarHumedadDirective
  ]
})
export class MedicionesPage implements OnInit {

  dispositivoId: string = '';
  mediciones: any[] = [];
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private dispositivoService: DispositivoService
  ) {}

  ngOnInit() {
    this.dispositivoId = this.route.snapshot.paramMap.get('id') || '';
    if (this.dispositivoId) {
      this.cargarMediciones();
    }
  }

  cargarMediciones() {
    this.dispositivoService.getMediciones(this.dispositivoId).subscribe({
      next: (res) => {
        this.mediciones = res;
        console.log("Historial de mediciones:", this.mediciones);
      },
      error: (err) => {
        this.errorMessage = "No se pudieron cargar las mediciones";
        console.error(err);
      }
    });
  }
}