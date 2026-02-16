// components/TaskItem.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onToggle(task.id)}
        style={styles.textContainer}
      >
        <Text style={[styles.text, task.completed && styles.completed]}>
          {task.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onDelete(task.id)}
        style={styles.deleteBtn}
      >
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  deleteBtn: {
    backgroundColor: "#ff4d4d",
    padding: 8,
    borderRadius: 4,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
