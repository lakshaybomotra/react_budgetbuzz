import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ActivityScreen from "./ActivityScreen";
import ProfileScreen from "./ProfileScreen";
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            top: -35,
            justifyContent: 'center',
            alignItems: 'center'
        }}
        onPress={onPress}
    >
        <View
            style={{
                width: 60,
                height: 60,
                borderRadius: 15,
                backgroundColor: '#00C795',
            }}
        >
            {children}
        </View>
    </TouchableOpacity>
);

const StatsScreen = () => <Text>Stats Screen</Text>;
const BudgetScreen = () => <Text>Budget Screen</Text>;

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: true,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Activity') {
                        iconName = focused ? 'clipboard' : 'clipboard-outline';
                    } else if (route.name === 'Stats') {
                        iconName = focused ? 'pie-chart' : 'pie-chart-outline';
                    } else if (route.name === 'Budget') {
                        iconName = focused ? 'wallet' : 'wallet-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#00C795',
                tabBarInactiveTintColor: '#748c94',
                tabBarStyle: {
                    position: 'absolute',
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 60
                },
                tabBarLabelStyle: {
                    display: route.name === 'Add' ? 'none' : 'flex',
                    paddingBottom: 5,
                }
            })}
        >
            <Tab.Screen
                name="Activity"
                component={ActivityScreen}
                options={{
                    tabBarLabel: 'Activity',
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Stats"
                component={StatsScreen}
                options={{
                    tabBarLabel: 'Overview',
                }}
            />
            <Tab.Screen
                name="Add"
                component={BudgetScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name="add" size={30} color="#fff" />
                    ),
                    tabBarButton: (props) => <CustomTabBarButton {...props} />
                }}
            />
            <Tab.Screen
                name="Budget"
                component={BudgetScreen}
                options={{
                    tabBarLabel: 'Budget',
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { useState, useEffect } from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import LoginScreen from './LoginScreen';
// import HomeScreen from './HomeScreen';
// import ActivityScreen from './ActivityScreen';
// import ProfileScreen from "./ProfileScreen";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//
// // const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
//
// export default function App() {
//   const [loading, setLoading] = useState(true);
//
//   // useEffect(() => {
//   //   const checkLoginStatus = async () => {
//   //     try {
//   //       const token = await AsyncStorage.getItem('userLoggedIn');
//   //       if (token) {
//   //         setIsLoggedIn(true);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error reading token from AsyncStorage', error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };
//   //   checkLoginStatus();
//   // }, []);
//
//   // if (loading) {
//   //   return (
//   //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//   //       <ActivityIndicator size="large" color="#0000ff" />
//   //     </View>
//   //   );
//   // }
//
//   return (
//       <NavigationContainer>
//       <Tab.Navigator>
//           <Tab.Screen name="Activiy" component={ActivityScreen} options={{ headerShown: false}}/>
//           <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false}}/>
//       </Tab.Navigator>
//       </NavigationContainer>
//     // <NavigationContainer>
//     //   <Stack.Navigator>
//     //     <Stack.Screen name="Activity" component={ActivityScreen} options={{ headerShown: false }} />
//     //     <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
//     //     <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//     //     <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//     //   </Stack.Navigator>
//     // </NavigationContainer>
//   );
// }
