/* eslint-disable react/prop-types */
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import {
  Main,
  Prevention,
  Symptoms,
  HowItSpreads,
  Advice,
  WhatToDo,
  Cases,
  Settings,
  Blank,
} from './src/screens';
import { textColor, tabBarColor } from './src/config';
import store from './src/store';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const tabBarOptions = {
  activeTintColor: textColor.alternate,
  inactiveTintColor: 'gray',
  style: {
    backgroundColor: tabBarColor,
    borderTopColor: 'transparent',
    height: 80,
    elevation: 20,
    borderRadius: 20,
    paddingBottom: 20,
    padding: 20,
    position: 'absolute',
    left: '2.5%',
    bottom: 15,
    width: '95%',
    alignSelf: 'center',
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20
  },
  tabStyle: {
  },
};
function StatsStack() {
  return (
    <Stack.Navigator initialRouteName="Main" headerMode="none">
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Cases" component={Cases} />
      <Stack.Screen name="Blank" component={Blank} />
    </Stack.Navigator>
  );
}

function AdviceStack() {
  return (
    <Stack.Navigator intialRouteName="AdviceMain" headerMode="none">
      <Stack.Screen name="AdviceMain" component={Advice} />
      <Stack.Screen name="HowItSpreads" component={HowItSpreads} />
      <Stack.Screen name="Symptoms" component={Symptoms} />
      <Stack.Screen name="Prevention" component={Prevention} />
      <Stack.Screen name="WhatToDo" component={WhatToDo} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, size }) => {
              const iconColor = focused ? textColor.alternate : 'gray';

              if (route.name === 'Stats') {
                return <Entypo name="line-graph" color={iconColor} size={size} />;
              } if (route.name === 'Advice') {
                return <SimpleLineIcon name="notebook" color={iconColor} size={size} />;
              } if (route.name === 'Settings') {
                return <SimpleLineIcon name="settings" color={iconColor} size={size} />;
              }
              return <SimpleLineIcon name="empty" color={iconColor} size={size} />;
            },
          })}

          tabBarOptions={tabBarOptions}
          initialRouteName="Stats"
          headerMode="none"
        >
          <Tab.Screen name="Stats" component={StatsStack} />
          <Tab.Screen name="Advice" component={AdviceStack} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
