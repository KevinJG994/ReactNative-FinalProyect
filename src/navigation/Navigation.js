import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

//Pantallas
import HomeScreen from "../screens/HomeScreen";
import CarteleraScreen from "../screens/CarteleraScreen";
import SettingsScreen from "../screens/InfoScreen";
import StackScreen from "../screens/StackScreen";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const HomeStackNavigator = createNativeStackNavigator();

function MyStack(){
    return (
        <HomeStackNavigator.Navigator
            initialRouteName="HomeScreen"
        >

            <HomeStackNavigator.Screen
                name="HomeScreen"
                component={HomeScreen}
                options= {{
                     headerShown: false,
                }}
            />
            <HomeStackNavigator.Screen
                name="Stack"
                component={StackScreen}
                options= {{
                    headerShown: false,
               }}
            />
        </HomeStackNavigator.Navigator>
    );
}


const Tab = createBottomTabNavigator();

function MyTabs() {
    return(
        <Tab.Navigator 
            initialRouteName="Home" 
            screenOptions= {{
                tabBarActiveTintColor: '#DEE7E7', 
                tabBarStyle: {
                    backgroundColor: '#2DCFCB',
                    height: 70,
                  },  
            }}
            >

            <Tab.Screen 
                name="Home" 
                component={MyStack} 
                options= {{
                    tabBarLabel: 'Feed',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={40} />
                    ),
                    headerShown: false,
                }}
            />

            <Tab.Screen 
                name="Cartelera" 
                component={CarteleraScreen} 
                options= {{
                    tabBarLabel: 'Cartelera',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="theater" color={color} size={40} />
                    ),
                    headerShown: false,
                }}
            />

            <Tab.Screen 
                name="Info" 
                component={SettingsScreen} 
                options= {{
                    tabBarLabel: 'Info',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="google-maps" color={color} size={40} />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return(
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}