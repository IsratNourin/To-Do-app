import { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CheckBox from "expo-checkbox";
import TodoAppService from "../api/api.service";
import TodoData from "../types/TodoData.type";

interface TaskProps {
  todoItem: TodoData;
  todos: TodoData[];
  setTodos: React.Dispatch<React.SetStateAction<TodoData[]>>;
}

const Task: FC<TaskProps> = (props) => {
  const { todoItem, todos, setTodos } = props;
  const [checked, setChecked] = useState<boolean>(todoItem.completed!);

  const completeTask = (index: number) => {
    TodoAppService.delete(index)
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });

    let itemsCopy = [...todos];
    itemsCopy.splice(index, 1);
    setTodos(itemsCopy);
  };
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <CheckBox
          style={styles.checkbox}
          disabled={false}
          value={checked}
          color="#0096c7"
          onValueChange={(newValue) => {
            todoItem.completed = newValue;
            TodoAppService.update(todoItem.id!, todoItem);
            setChecked(newValue);
          }}
        />
        <Text
          style={[
            styles.itemText,
            todoItem.completed ? styles.completed : null,
          ]}
        >
          {todoItem.title}
        </Text>
      </View>
      <View style={styles.circular}>
        <TouchableOpacity
          onPress={() => {
            completeTask(todoItem.id!);
          }}
        >
          <Ionicons name="trash" size={24} color="grey" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#ade8f4",
    // borderColor: "#0096c7",
    // borderWidth: 2,
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 4,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  itemText: {
    maxWidth: "80%",
    fontFamily: "Gilroy-Regular",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  circular: {
    width: 24,
    height: 24,
  },
  completed: {
    textDecorationLine: "line-through",
  },
  checkbox: {
    marginRight: 15,
  },
});

export default Task;
