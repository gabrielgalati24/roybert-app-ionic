import { Component, OnInit } from '@angular/core';

import { Routes, RouterModule, Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ejerciciol2',
  templateUrl: './ejerciciol2.page.html',
  styleUrls: ['./ejerciciol2.page.scss'],
})
export class Ejerciciol2Page{

  readonly LETRAS = [
    "Mis amigos vienen a casa por la tarde","Mis amigos  hoy a casa por la tarde"

];

readonly PALABRAS = [""];

botones: Array<{ letra: string, estado: string }>;

palabraAdivinadaPorAhora: string;
palabraAAdivinar: string;
fallos: Array<string>;
numFallos: number;
numAciertos: number;
//public navCtrl: NavController, public alertCtrl: AlertController
constructor(public alertController: AlertController, private router:Router) {
    this.inicializar();
}

inicializar(): void {
    
    this.numFallos = 0;
    this.numAciertos = 0;
    this.fallos = [];
    this.botones = [];
    let numero = Math.floor(Math.random() * this.PALABRAS.length);
    this.palabraAAdivinar = this.PALABRAS[numero];

    this.generarPalabraAdivinadaPorAhora();
    this.inicializarBotones();
}

inicializarBotones(): void {
    for (let i = 0; i < this.LETRAS.length; i++) {
        this.botones.push({ letra: this.LETRAS[i], estado: "boton-no-pulsado-aun" });
    }
}

generarPalabraAdivinadaPorAhora(): void {

    this.palabraAdivinadaPorAhora = "";
    for (let i = 0; i < this.palabraAAdivinar.length; i++) {
        this.palabraAdivinadaPorAhora += "-";
    }
}




botonClicked1(){
    // if (this.letraAcertada(boton.letra) == "Mis amigos  hoy a casa por la tarde") {
        this.mostrarMensajeDePerder();
    // }



}

botonClicked2(){
    // if (this.letraAcertada(boton.letra) == "Mis amigos  hoy a casa por la tarde") {
      
         
            this.mostrarMensajeDeGanar();

    // }
    


}



botonClicked(boton: { letra: string, estado: string}): void {

    if (!this.letraAcertada(boton.letra)) {
        if (this.numFallos < 0) {//numero de intentos
            this.aumentarFallos(boton.letra);
        } else {
            this.mostrarMensajeDePerder();
        }
        boton.estado = "boton-letra-no-acertada";
    } else {
        if (this.numAciertos == this.palabraAAdivinar.length) {
            this.mostrarMensajeDeGanar();
        }
        boton.estado = "boton-letra-acertada";
    }
}

letraAcertada(letra: string): boolean {

    let letraAcertada = false;
    let longitud = this.palabraAAdivinar.length;

    for (let i = 0; i < longitud; i++) {
        if (letra == this.palabraAAdivinar[i]) {
            this.palabraAdivinadaPorAhora =
                (i == 0 ? "" : this.palabraAdivinadaPorAhora.substr(0, i)) +
                letra +
                this.palabraAdivinadaPorAhora.substr(i + 1);
            letraAcertada = true;
            this.numAciertos++;
        }
    }
    return letraAcertada;
}

aumentarFallos(letra: string): void {
    this.fallos.push(letra);
    this.numFallos++;
}


async mostrarMensajeDePerder() {
    const alert = await this.alertController.create({
      header: 'Ha Perdido',
      subHeader: 'D:',
      message: '¡Lo siento! Pulse Ok para jugar otra vez.',
      buttons: ['OK']
    });
    this.inicializar();
    await alert.present();
  }


async mostrarMensajeDeGanar() {
    const alert = await this.alertController.create({
      header: 'Ha Ganado',
      subHeader: ':D',
      message: '¡Felicidades! Pulse Ok para jugar otra vez.',
      buttons: ['OK']
   
      
    });
    this.router.navigate(['/ejerciciol3']);
    this.inicializar();
    await alert.present();
  }
}


