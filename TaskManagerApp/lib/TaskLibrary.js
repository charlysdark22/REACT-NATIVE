// lib/TaskLibrary.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "./constants";

class TaskLibrary {
  // Obtener todas las tareas
  async getTasks() {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error("Error al leer tareas", e);
      return [];
    }
  }

  // Guardar lista completa (uso interno)
  async _saveTasks(tasks) {
    try {
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error("Error al guardar tareas", e);
    }
  }

  // Agregar una nueva tarea
  async addTask(title) {
    const tasks = await this.getTasks();
    const newTask = {
      id: Date.now().toString(), // ID único basado en tiempo
      title: title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const updatedTasks = [...tasks, newTask];
    await this._saveTasks(updatedTasks);
    return updatedTasks; // Devolvemos la lista actualizada para actualizar el estado
  }

  // Cambiar estado (completada/pendiente)
  async toggleTask(id) {
    const tasks = await this.getTasks();
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    await this._saveTasks(updatedTasks);
    return updatedTasks;
  }

  // Eliminar tarea
  async deleteTask(id) {
    const tasks = await this.getTasks();
    const updatedTasks = tasks.filter((task) => task.id !== id);
    await this._saveTasks(updatedTasks);
    return updatedTasks;
  }
}

// Exportamos una instancia única (Patrón Singleton)
export default new TaskLibrary();
