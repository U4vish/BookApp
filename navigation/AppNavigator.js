// navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import BookListScreen from '../screens/BookListScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import BorrowedBooksScreen from '../screens/BorrowedBooksScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BookStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BookList" component={BookListScreen} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Books" component={BookStack} />
        <Tab.Screen name="Borrowed" component={BorrowedBooksScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

