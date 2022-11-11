import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./screens/Home";
import { TaskDetails } from "./screens/TaskDetails";

export type TaskDetailsParamsList = {
  Home: undefined;
  TaskDetails: { id: number };
};

const Stack = createNativeStackNavigator<TaskDetailsParamsList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="TaskDetails" component={TaskDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
