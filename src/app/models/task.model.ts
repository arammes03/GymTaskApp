export interface Task {
  id: number;
  title: string;
  completed: boolean;
  editing?: boolean; // Propiedad adicional para el modo de edición
}
