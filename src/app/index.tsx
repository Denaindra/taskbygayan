import { useState } from "react";
import {
    FlatList,
    ListRenderItem,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} from "react-native";
import { DataArray } from "./dataStore/tasklist";

type TaskItem = {
  id: string;
  title: string;
  status: string;
  priority: string;
};

export default function Index() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(DataArray);

  // Function to handle search input and filter tasks
  const handleSearch = (text: string) => {
    setSearch(text);
    const formattedQuery = text.toLowerCase();
    const filtered = DataArray.filter((item) => {
      return item.title.toLowerCase().includes(formattedQuery);
    });

    setFilteredData(filtered);
  };

  // Function to sort tasks by priority
  const handleSort = () => {
    const sortedData = [...DataArray].sort((a, b) => {
      if (a.priority === "High" && b.priority === "Low") return -1;
      if (a.priority === "Low" && b.priority === "High") return 1;
      return 0;
    });
    setFilteredData(sortedData);
  };

  // Function to render each item in the FlatList
  const renderItem: ListRenderItem<TaskItem> = ({ item }) => (
    <Pressable
      onPress={() => UpdateTheStatus(item)}
      style={{ marginBottom: 10, padding: 10, backgroundColor: "#f0f0f0" }}
    >
      <View>
        <Text>{item.title}</Text>
        <Text>{item.status}</Text>
        <Text>{item.priority}</Text>
      </View>
    </Pressable>
  );

  // Function to update the status of a task
  const UpdateTheStatus = (item: TaskItem) => {
    const updatedData = filteredData.map((task) => {
      if (task.id === item.id) {
        return {
          ...task,
          status: task.status === "Pending" ? "Completed" : "Pending",
        };
      }
      return task;
    });
    setFilteredData(updatedData);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Welcome to Employee Task Management
      </Text>
      <TouchableHighlight onPress={handleSort}>
        <Text>Sort Prioritized Tasks</Text>
      </TouchableHighlight>
      <TextInput
        placeholder="Search Tasks by title..."
        value={search}
        onChangeText={handleSearch}
      />
      <Text>View Tasks</Text>
      <FlatList
        data={filteredData.length > 0 ? filteredData : DataArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    marginTop: 10,
    paddingHorizontal: 10,
  },
});
