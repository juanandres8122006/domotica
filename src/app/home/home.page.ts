import { Component } from '@angular/core';
import { Database, ref, set } from '@angular/fire/database';

// Interfaz para definir la estructura de luminarias
interface Luminarias {
  [key: string]: { estado: boolean };
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  luminarias: Luminarias = {
    'baño': { estado: false },
    'cocina': { estado: false },
    'dormitorio': { estado: false },
    'sala': { estado: false }
  };

  constructor(private database: Database) {}

  toggleLuminaria(espacio: string) {
    const luminariaRef = ref(this.database, 'casa/' + espacio + '/estado');
    const estadoActual = this.luminarias[espacio].estado;
    
    set(luminariaRef, !estadoActual).then(() => {
      console.log("Estado de la luminaria " + espacio + " actualizado correctamente.");
    }).catch((error) => {
      console.error("Error actualizando el estado de la luminaria:", error);
    });
  }
}
