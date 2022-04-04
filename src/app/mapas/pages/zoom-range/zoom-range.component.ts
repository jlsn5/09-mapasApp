import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container{
        width: 100%;
        height: 100%;
      }

      .row{
        background-color: white;
        border-radius: 5px;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        position: fixed;
        z-index: 999;
        width: 400px;
      }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit {

  //Recoger el div del mapa para poder retocarlo
  @ViewChild('mapa') divMapa: ElementRef;
  mapa: mapboxgl.Map;
  zoomLevel: number = 16;
  center: [number, number] = [ -75.921029433568, 45.28719674822362 ];

  constructor() { }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel // starting zoom
    });

    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom();
      this.zoomLevel
    });

    this.mapa.on('zoomend', (ev) => {

      //Limitar zoom máximo
      if (this.mapa.getZoom() > 18 ) {
        this.mapa.zoomTo( 18 );
      }

    });

    // Movimiento del mapa
    this.mapa.on('move', (event) => {
      const target = event.target;
      const { lng, lat } = target.getCenter();
      this.center = [lng, lat];
    });

  }

  zoomIn(){
    this.mapa.zoomIn();
  }

  zoomOut(){
    this.mapa.zoomOut();
  }

  zoomCambio( valor: string ) {
    this.mapa.zoomTo( Number(valor) );
  }

}
