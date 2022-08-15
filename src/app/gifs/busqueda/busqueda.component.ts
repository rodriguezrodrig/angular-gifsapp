import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../service/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;//nonn-null-assertion operator

  constructor( private gifsService:GifsService){

  }

  buscar(){
    
    const valor = this.txtBuscar.nativeElement.value;

    if(valor.trim().length===0){
      return;
    }
    
    this.gifsService.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = '';

  }
}
