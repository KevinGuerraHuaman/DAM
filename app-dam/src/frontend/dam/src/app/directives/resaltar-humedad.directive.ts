
import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResaltarHumedad]',
  standalone: true   // 👈 agrega esto
})
export class ResaltarHumedadDirective implements OnChanges {

  @Input('appResaltarHumedad') valor!: number;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    if (this.valor != null) {
      if (this.valor < 30) {
        this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
        this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
      } else if (this.valor >= 30 && this.valor < 60) {
        this.renderer.setStyle(this.el.nativeElement, 'color', 'orange');
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'color', 'green');
      }
    }
  }
}