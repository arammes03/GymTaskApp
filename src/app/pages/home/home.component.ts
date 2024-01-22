import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal(['Ir al gym', 'Sacar 100kg en banca', 'Tener 300kg en dl']);

  // Handler que maneja la inserción de un nuevo task
  newTaskInputHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;

    // Actualizamos nuestra lista de tasks sin resetear los datos
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  // Handler que nos permite borrar un task
  deleteTaskHandler(index: number) {
    /* Actualizamos nuestra lista filtrando por los tasks y su posición.
    Donde la posición sea distinta al indice que queremos no se borra */
    this.tasks.update((tasks) =>
      tasks.filter((task, position) => position !== index)
    );
  }
}
