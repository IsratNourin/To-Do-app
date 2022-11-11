import { FC, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import DatePicker from "react-native-modern-datepicker";

interface DateTimePickerProps {
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCustomDateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DateTimePicker: FC<DateTimePickerProps> = (props) => {
  const { setVisibleModal, setSelectedDate, setCustomDateModal } = props;

  return (
    <View style={styles.modalContent}>
      <DatePicker
        wrapperClassName="DateTimePicker"
        minuteInterval={1}
        onSelectedChange={(date: string) => {
          setSelectedDate(date);
        }}
      />
      <Button
        onPress={() => {
          setVisibleModal(true);
          setCustomDateModal(false);
        }}
        title="Save Time"
        color="#0096c7"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    borderRadius: 4,
  },
});
