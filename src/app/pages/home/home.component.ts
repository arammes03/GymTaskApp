import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  signal,
  effect,
  inject,
  Injector,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  /*tasks = signal<Task[]>([
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
  ]);*/
  // Estado para almacenar la lista de tareas usando señal (`signal`)
  tasks = signal<Task[]>([]);

  // Inyector para usar en el efecto
  injector = inject(Injector);

  // Método del ciclo de vida ngOnInit
  ngOnInit() {
    // Recuperar tareas almacenadas en el localStorage al iniciar el componente
    const storage = localStorage.getItem('Tasks');
    if (storage) {
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    // Iniciar el seguimiento de las tareas para almacenarlas en localStorage
    this.trackTasks();
  }

  // Método para realizar un seguimiento de las tareas y almacenarlas en localStorage mediante un efecto
  trackTasks() {
    effect(
      () => {
        const tasks = this.tasks();
        console.log(tasks);
        localStorage.setItem('Tasks', JSON.stringify(tasks));
      },
      { injector: this.injector }
    );
  }

  // Estado para el filtro de tareas (por defecto, 'all')
  filter = signal<'all' | 'pending' | 'completed'>('all');

  // Función computada para filtrar tareas según el filtro seleccionado
  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    return tasks;
  });

  // FormControl para el input de nuevo task con validaciones
  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });

  // Handler que maneja la inserción de un nuevo task
  newTaskInputHandler() {
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim();
      if (value !== '') {
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }
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
    // Filtrar las tareas por posición, excluyendo la tarea en la posición del índice
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

  // Método para activar el modo de edición de una tarea
  updateTaskEditingMode(index: number) {
    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true,
          };
        }
        return {
          ...task,
          editing: false,
        };
      });
    });
  }

  // Método para actualizar el título de una tarea en modo de edición
  updateTaskTitle(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: input.value,
            editing: false,
          };
        }
        return task;
      });
    });
  }

  // Método para cambiar el filtro de tareas (all, pending, completed
  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }
}
