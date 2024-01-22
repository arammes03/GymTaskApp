import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  title = 'todo-app';
  welcome = 'hola';
  tasks = ['Ir al gym', 'Sacar 100kg en banca', 'Tener 300kg en dl'];
  name = 'Alfonso';
  age = 20;
  disabled = true;
  img =
    'https://www.elnacional.cat/enblau/uploads/s1/39/86/97/39/europapress-5033207-alonso-fernando-spa-aston-martin-f1-team-amr23-portrait-celebrates-with-the.jpeg';

  person = {
    name: 'Alfonso',
    age: 20,
    avatar: 'https://w3schools.com/howto/img_avatar.png',
  };

  clickHandler() {
    alert('Hola');
  }

  changeHandler(event: Event) {
    console.log(event);
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}
