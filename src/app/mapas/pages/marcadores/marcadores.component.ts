import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor{
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container{
        width: 100%;
        height: 100%;
    }

    .list-group{
      position:fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }

    li{
      cursor: pointer;
    }

    `
  ]
})

export class MarcadoresComponent implements AfterViewInit {

  //Recoger el div del mapa para poder retocarlo
  @ViewChild('mapa') divMapa: ElementRef;
  mapa: mapboxgl.Map;
  zoomLevel: number = 16;
  center: [number, number] = [-0.76651014843498, 38.38460283123223];

  //Array de marcadores
  marcadores: MarcadorColor[] = [];


  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel // starting zoom
    });

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola Mundo';

    // new mapboxgl.Marker()
    //     .setLngLat( this.center )
    //     .addTo( this.mapa );

  }

  agregarMarcador(){

    //Color random
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat( this.center )
      .addTo ( this.mapa );

      this.marcadores.push({
        color,
        marker: nuevoMarcador
      });

      this.guadarMarcadoresLocalStorage()
  }

  irMarcador( marcador:mapboxgl.Marker ){
    this.mapa.flyTo( {
      center: marcador.getLngLat()
    });
  }

  guadarMarcadoresLocalStorage(){

    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach( m => {

      const color = m.color;
      const {lng, lat} = m.marker.getLngLat();

      lngLatArr.push({
        color: m.color,
        centro: [ lng, lat ]
      });

    })

    localStorage.setItem( 'marcadores', JSON.stringify( lngLatArr ) );

  }

  leerLocalStorage(){

  }

}