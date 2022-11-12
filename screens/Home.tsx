import { useState, useEffect, FC } from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";

import Task from "../components/Task";
import TodoAppService from "../api/api.service";
import TodoData from "../types/TodoData.type";
import { CreateTask } from "../components/CreateTask";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import { TaskDetailsParamsList } from "../App";

type HomeProps = NativeStackScreenProps<TaskDetailsParamsList, "Home">;

export const Home: FC<HomeProps> = (props) => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [emptyList, setEmptyList] = useState<boolean>(true);
  const [todos, setTodos] = useState<TodoData[]>([]);
  const [loaded] = useFonts({
    "Gilroy-Regular": require("../assets/fonts/Gilroy-Regular.ttf"),
    "Gilroy-Bold": require("../assets/fonts/Gilroy-Bold.ttf"),
  });

  useEffect(() => {
    // getTodos();
    var tempTodos: TodoData[] = [];
    var tempTaskItems: string[] = [];

    TodoAppService.getAll()
      .then((response: any) => {
        if (response.data.items.length > 0) {
          setEmptyList(false);
        }
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

  if (!loaded) {
    return <AppLoading />;
  }

  if (emptyList) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.sectionRow}>
            <Ionicons
              style={{ marginTop: 5, marginRight: 10 }}
              name="checkmark-circle"
              size={24}
              color="#0096c7"
            />

            <Text style={styles.headerText}>Tasks To Do</Text>
          </View>

          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginTop: 10,
            }}
          />
        </View>
        <View style={styles.emptyList}>
          <Image source={require("../assets/background.png")} />
          <Text>Nothing to Show</Text>
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
  } else {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.sectionRow}>
            <Ionicons
              style={{ marginTop: 5, marginRight: 10 }}
              name="checkmark-circle"
              size={24}
              color="#0096c7"
            />

            <Text style={styles.headerText}>Tasks To Do</Text>
          </View>

          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginTop: 10,
            }}
          />

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
  }
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

  sectionRow: {
    flexDirection: "row",
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Gilroy-Bold",
    color: "#837c7c",
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
  emptyList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
