import React, { Component, useState, useEffect } from "react";

import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts, BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import { dab1, dab2, dab3, blank } from "../assets/dabs/dabindex";

//   onPress={() => console.log("pressed task", tasks.item.id)}

const defaultDabs = [dab1, dab2, dab3];

// ------setting bingo card sizes------
const screenWidth = Dimensions.get("screen").width;
const numColumns = 3;
const tileSize = screenWidth / numColumns;

export default function TasksList({ tasks, packId }) {
  const navigation = useNavigation();
  const route = useRoute();
  const [dabs, setDabs] = useState(blank);

  useEffect(() => {
    if (route.params.taskCompleted) {
      console.log(route.params);
      setDabs(randomDab);
    }
  }, []);
  // console.log(route.params);

  const randomDab = () => {
    return defaultDabs[Math.floor(Math.random() * defaultDabs.length)];
  };

  const GridView = ({ tasks }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Camera", {
          taskId: tasks.item.id,
          packId,
        })
      }
      style={styleSheet.gridStyle}
    >
      {/* ------ask someone about onpress so dabs only show when pressed ------ */}
      <ImageBackground
        source={dabs}
        resizeMode="contain"
        style={styleSheet.image}
      >
        <Text style={styleSheet.gridText}>{tasks.item.description}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styleSheet.MainContainer}>
      <FlatList
        data={tasks}
        renderItem={(tasks) => <GridView tasks={tasks} />}
        keyExtractor={(tasks, index) => "task" + index}
        numColumns={3}
      />
    </SafeAreaView>
  );
}

const styleSheet = StyleSheet.create({
  MainContainer: {
    backgroundColor: "#F7EFE7",
  },
  gridStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: tileSize,
    width: tileSize,
    backgroundColor: "#F7EFE7",
    margin: 0.5,
    padding: 10,
    textAlign: "center",
    borderStyle: "solid",
    borderColor: "#24112F",
    borderWidth: 1,
  },

  gridText: {
    fontSize: 14,
    color: "#24112F",
    fontFamily: "BebasNeue_400Regular",
    textAlign: "center",
  },

  image: {
    flex: 1,
    justifyContent: "center",
    // resizeMode: "cover",
  },
});
