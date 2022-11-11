import { useState, useEffect, FC } from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";
import Task from "../components/Task";

import TodoAppService from "../api/api.service";
import TodoData from "../types/TodoData.type";
import { CreateTask } from "../components/CreateTask";
import { TaskDetails } from "./TaskDetails";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TaskDetailsParamsList } from "../App";

type HomeProps = NativeStackScreenProps<TaskDetailsParamsList, "Home">;

export const Home: FC<HomeProps> = (props) => {
  const [task, setTask] = useState<string>("");
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [todos, setTodos] = useState<TodoData[]>([]);

  // const handleAddTask = () => {
  //   Keyboard.dismiss();
  //   setTaskItems([...taskItems, task]);
  //   setTask("");
  // };

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

  useEffect(() => {
    // getTodos();
    var tempTodos: TodoData[] = [];
    var tempTaskItems: string[] = [];

    TodoAppService.getAll()
      .then((response: any) => {
        response.data.items.map((item: TodoData) => {
          tempTaskItems.push(item.title);
          tempTodos.push(item);
        });

        setTodos(tempTodos);
      })
      .catch((e: Error) => {
        console.log(e);
        ToastAndroid.show("Facing 403 Error! Retry Again!", ToastAndroid.LONG);
      });
  }, [todos]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Tasks To Do</Text>

        <View style={styles.items}>
          {todos.map((item, index) => {
            return (
              //   <TouchableOpacity
              //     key={index}
              //     onPress={() => completeTask(item.id!)}
              //   >
              <TouchableOpacity
                key={index}
                onPress={() =>
                  props.navigation.push("TaskDetails", {
                    id: item.id!,
                  })
                }
              >
                <Task todoItem={item} todos={todos} setTodos={setTodos} />
              </TouchableOpacity>
              //   </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Create a todo task */}
      <CreateTask
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        setTodos={setTodos}
      />

      <TouchableOpacity
        onPress={() => {
          setVisibleModal(true);
        }}
      >
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },

  items: {
    marginTop: 30,
  },

  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    fontSize: 30,
    color: "#0096c7",
  },
});
