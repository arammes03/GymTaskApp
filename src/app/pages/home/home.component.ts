import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Ir al gym',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Sacar 100kg en BP',
      completed: true,
    },
    {
      id: Date.now(),
      title: 'Tirar 300kg en DL',
      completed: false,
    },
  ]);

  // Handler que maneja la inserción de un nuevo task
  newTaskInputHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask);
  }

  // Metodo que añade una tarea
  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false,
    };
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

  // Handler que nos permite actualizar una tarea de completada a no o viceversa
  updateTaskHandler(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });
    });
  }
}
