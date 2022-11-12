import { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TaskDetailsParamsList } from "../App";
import TodoAppService from "../api/api.service";
import TodoData from "../types/TodoData.type";

type TaskDetailsProps = NativeStackScreenProps<
  TaskDetailsParamsList,
  "TaskDetails"
>;

export const TaskDetails: FC<TaskDetailsProps> = (props) => {
  const [todo, setTodo] = useState<TodoData>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const updateTaskHandler = (todo: TodoData) => {
    var temp: TodoData = todo;
    temp.title = title;
    temp.description = description;
    TodoAppService.update(todo.id!, temp).then((response) => {
      console.log(response.data);
      props.navigation.push("Home");
    });
  };

  useEffect(() => {
    TodoAppService.get(props.route.params.id).then((response) => {
      console.log(response.data);
      setTodo(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
    });
  }, []);

  if (todo) {
    return (
      <View style={styles.container}>
        <View style={styles.sectionRow}>
          <Text style={todo.completed ? styles.completed : styles.notCompleted}>
            {todo.completed ? "Completed" : "Not Completed"}
          </Text>
        </View>
        <View style={styles.sectionColumn}>
          <Text style={styles.textTitle}>Task ID: </Text>
          <TextInput
            style={styles.inputDescription}
            editable={false}
            selectTextOnFocus={false}
            placeholder={"Task Title"}
            value={todo.id!.toString()}
          />
        </View>
        <View style={styles.sectionColumn}>
          <Text style={styles.textTitle}>Task Title: </Text>
          <TextInput
            style={styles.inputDescription}
            placeholder={"Task Title"}
            onChangeText={(e) => setTitle(e)}
            value={title}
          />
        </View>

        <View style={styles.sectionColumn}>
          <Text style={styles.textTitle}>Task Description: </Text>
          <TextInput
            style={styles.inputDescription}
            multiline={true}
            numberOfLines={5}
            placeholder={"Task Description"}
            onChangeText={(e) => setDescription(e)}
            value={description}
          />
        </View>

        <View style={styles.sectionColumn}>
          <Text style={styles.textTitle}>Created At:</Text>
          <TextInput
            style={styles.inputDescription}
            editable={false}
            selectTextOnFocus={false}
            placeholder={"Task Created At"}
            value={todo.createdAt}
          />
        </View>

        <View style={styles.sectionColumn}>
          <Text style={styles.textTitle}>Last Updated: </Text>
          <TextInput
            style={styles.inputDescription}
            editable={false}
            selectTextOnFocus={false}
            placeholder={"Last Updated"}
            value={todo.updatedAt}
          />
        </View>

        <View style={styles.updateTask}>
          <Button
            onPress={() => {
              updateTaskHandler(todo);
            }}
            title="Update Task"
            color="#0096c7"
            accessibilityLabel="Update the Task"
          />
        </View>
      </View>
    );
  } else {
    return <View></View>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sectionRow: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 20,
  },

  sectionColumn: {
    flexDirection: "column",
    marginHorizontal: 10,
    marginVertical: 10,
  },

  completed: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "white",
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    fontFamily: "Gilroy-Bold",
  },

  notCompleted: {
    position: "absolute",
    right: 10,
    top: 0,
    color: "white",
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    fontFamily: "Gilroy-Bold",
  },

  textTitle: {
    marginHorizontal: 10,
    marginVertical: 15,
    fontSize: 14,
    color: "#0096c7",
    fontFamily: "Gilroy-Regular",
  },

  inputDescription: {
    marginTop: 2,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#F2F3F4",
    borderRadius: 5,
    borderColor: "#48cae4",
    borderWidth: 1,
    fontFamily: "Gilroy-Regular",
  },

  updateTask: {
    marginTop: 10,
    marginHorizontal: 20,
  },
});
