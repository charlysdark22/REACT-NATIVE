// App.js
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Keyboard,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";
import TaskItem from "./components/TaskItem";
import TaskLibrary from "./lib/TaskLibrary";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);

  // Cargar tareas al iniciar la app
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const storedTasks = await TaskLibrary.getTasks();
    setTasks(storedTasks);
    setLoading(false);
  };

  const handleAddTask = async () => {
    if (inputText.trim() === "") return;

    Keyboard.dismiss(); // Ocultar teclado
    const updatedTasks = await TaskLibrary.addTask(inputText);
    setTasks(updatedTasks);
    setInputText("");
  };

  const handleToggleTask = async (id) => {
    const updatedTasks = await TaskLibrary.toggleTask(id);
    setTasks(updatedTasks);
  };

  const handleDeleteTask = async (id) => {
    const updatedTasks = await TaskLibrary.deleteTask(id);
    setTasks(updatedTasks);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Mis Tareas</Text>
          <Text style={styles.subtitle}>Persistencia Local</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escribe una nueva tarea..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleAddTask}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay tareas. ¡Agrega una!</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    // Ajuste para Android Status Bar
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#007AFF",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginLeft: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#999",
    fontSize: 16,
  },
});
