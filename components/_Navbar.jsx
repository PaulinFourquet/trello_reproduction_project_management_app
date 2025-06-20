import { View, Text, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import Board from "./Board";
import WorkSpace from "./WorkSpace";
import Organization from "./Organization";
import React from "react";

const Stack = createNativeStackNavigator();

const Navbar = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Organization">
      <Stack.Screen
          name="Organization"
          component={Organization}
          options={{
            headerStyle: {
              backgroundColor: "#B8B8F3",
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerLeft: () => (
              <View style={{ marginLeft: 10, flexDirection:'row', alignItems:'center', justifyContent: 'space-between', gap:5 }}>
                <FontAwesome5 name="trello" size={24} color="black" />
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Trello</Text>
              </View>
            ),
            headerRight: () => (
              <View
                style={{
                  marginRight: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Workspace"
          component={WorkSpace}
          options={{
            headerStyle: {
              backgroundColor: "#B8B8F3",
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerLeft: () => (
              <View style={{ marginLeft: 10, flexDirection:'row', alignItems:'center', justifyContent: 'space-between', gap:5 }}>
                <FontAwesome5 name="trello" size={24} color="black" />
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Trello</Text>
              </View>
            ),
            headerRight: () => (
              <View
                style={{
                  marginRight: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Board"
          component={Board}
          options={{
            headerStyle: {
              backgroundColor: "#B8B8F3",
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerLeft: () => (
              <View style={{ marginLeft: 10, flexDirection:'row', alignItems:'center', justifyContent: 'space-between', gap:5 }}>
                <FontAwesome5 name="trello" size={24} color="black" />
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Trello</Text>
              </View>
            ),
            headerRight: () => (
              <View
                style={{
                  marginRight: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
              </View>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navbar;