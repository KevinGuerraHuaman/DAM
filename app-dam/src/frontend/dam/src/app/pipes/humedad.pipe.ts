
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humedad',
  standalone: true   // 👈 agrega esto
})
export class HumedadPipe implements PipeTransform {
  transform(value: any): string {
    if (value == null || value === '') return 'Sin dato';
    return `${value}% humedad`;
  }
}