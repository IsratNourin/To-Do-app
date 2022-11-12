import { FC, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import moment from "moment";
import { DateTimePicker } from "./DateTimerPicker";
import TodoAppService from "../api/api.service";
import TodoData from "../types/TodoData.type";

interface CreateTaskProps {
  visibleModal: boolean;
  setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTodos: React.Dispatch<React.SetStateAction<TodoData[]>>;
}

export const CreateTask: FC<CreateTaskProps> = (props) => {
  const { visibleModal, setVisibleModal, setTodos } = props;
  const [customDateModal, setCustomDateModal] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");
  const [taskDetails, setTaskDetails] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [calenderSelect, setCalanderSelect] = useState<boolean>(false);

  const createTaskHandler = () => {
    if (task === "") {
      Alert.alert("Please enter a task");
      return;
    } else if (selectedDate === "") {
      Alert.alert("Please select a date");
      return;
    } else if (taskDetails === "") {
      Alert.alert("Please enter task details");
      return;
    }
    var parsed_date: string = new Date(selectedDate).toISOString();
    const data: TodoData = {
      title: task,
      description: taskDetails,
      deadline: parsed_date,
      createdAt: moment().toISOString(),
    };
    console.log(data);

    TodoAppService.create(data)
      .then((response: any) => {
        console.log(response.data);
        setVisibleModal(false);
        setTask("");
        setTaskDetails("");
        setSelectedDate("");

        /* Refresh the list */
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
          });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <View style={styles.container}>
      <Modal isVisible={customDateModal === true} style={styles.bottomModal}>
        <DateTimePicker
          setSelectedDate={setSelectedDate}
          setVisibleModal={setVisibleModal}
          setCustomDateModal={setCustomDateModal}
        />
      </Modal>

      <Modal isVisible={visibleModal === true} style={styles.bottomModal}>
        <View style={styles.modalContent}>
          <View style={styles.taskHeader}>
            <Text style={styles.createTask}>Create Task</Text>
            {/* {this._renderButton("Close", () =>
                this.setState({ visibleModal: null })
            )} */}
          </View>
          <View style={styles.backButton}>
            <TouchableOpacity onPress={() => setVisibleModal(false)}>
              <Ionicons name="arrow-back" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.taskTitle}>Task Title</Text>
            <TextInput
              style={styles.input}
              placeholder={"Task Title"}
              onChangeText={(e) => setTask(e)}
              value={task}
            />
          </View>

          <View style={styles.taskDescription}>
            <Text>Task Description</Text>
            <TextInput
              style={styles.input}
              placeholder={"Task Description"}
              onChangeText={(e) => setTaskDetails(e)}
              value={taskDetails}
            />
          </View>

          <View style={styles.taskDeadline}>
            <Text>Task Deadline</Text>

            <View style={styles.dateTimeContainer}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Date & Time"
                value={selectedDate}
              />
              <TouchableOpacity
                onPress={() => {
                  setVisibleModal(false);
                  setCustomDateModal(true);
                }}
              >
                <Ionicons name="calendar" size={24} color="#48cae4" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.createTaskButton}>
            <Button
              onPress={() => {
                createTaskHandler();
              }}
              title="Add"
              color="#0096c7"
              accessibilityLabel="Create a Task"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    borderRadius: 4,
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  taskHeader: {
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 15,
  },
  taskTitle: {
    justifyContent: "flex-start",
    marginTop: 20,
    fontFamily: "Gilroy-Regular",
  },
  createTask: {
    fontFamily: "Gilroy-Bold",
    fontSize: 18,
    color: "#837c7c",
  },
  input: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderColor: "#48cae4",
    borderWidth: 1,
  },

  taskDescription: {
    marginTop: 20,
  },

  taskDeadline: {
    marginTop: 20,
    marginVertical: 30,
  },

  dateTimeContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    marginTop: 10,
    borderColor: "#48cae4",
    paddingBottom: 10,
  },
  inputStyle: {
    flex: 1,
  },

  createTaskButton: {
    marginTop: 20,
  },
});
