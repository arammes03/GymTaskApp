import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  title = 'todo-app';
  welcome = 'hola';
  tasks = signal(['Ir al gym', 'Sacar 100kg en banca', 'Tener 300kg en dl']);
  name = signal('Alfonso');
  age = 20;
  disabled = true;
  img =
    'https://www.elnacional.cat/enblau/uploads/s1/39/86/97/39/europapress-5033207-alonso-fernando-spa-aston-martin-f1-team-amr23-portrait-celebrates-with-the.jpeg';

  person = signal({
    name: 'Alfonso',
    age: 20,
    avatar: 'https://w3schools.com/howto/img_avatar.png',
  });

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, {
    nonNullable: true,
  });

  nameCtrl = new FormControl('Alfonso', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });

  constructor() {
    this.colorCtrl.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  clickHandler() {
    alert('Hola');
  }

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newInput = input.value;
    this.name.set(newInput);
  }

  changeAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const newInput = input.value;
    this.person.update((prevState) => {
      return {
        ...prevState,
        age: parseInt(newInput, 10),
      };
    });
  }

  changeName(event: Event) {
    const input = event.target as HTMLInputElement;
    const newInput = input.value;
    this.person.update((prevState) => {
      return {
        ...prevState,
        name: newInput,
      };
    });
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}
