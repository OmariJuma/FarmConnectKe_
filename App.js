import React, {
  createContext,
  lazy,
  useContext,
  useEffect,
  useState,
} from 'react';
import {ActivityIndicator, PaperProvider, Text} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppBar, {primaryColor} from './Components/UI/AppBar';
import Home from './Components/Pages/Home';
import Second from './Components/Pages/Second';
import Login from './Components/Pages/Login';
import Signup from './Components/Pages/Signup';
import Third from './Components/Pages/Third';
import CustomerCare from './Components/Pages/CustomerCare';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './firebase';
import {
  AuthenticatedUserProvider,
  AuthenticatedUserContext,
} from './Store/Provider';

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const {user, setUser} = useContext(AuthenticatedUserContext);
  const homeName = 'Home';
  const secondName = 'Second';
  const customerCare = 'Customer Care';

  const NavTabs = () => (
    <Tab.Navigator
      // initialRouteName={homeName}
      screenOptions={({route}) => ({
        lazy: false,
        headerShown: false,
        tabBarActiveTintColor: primaryColor,
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: {paddingBottom: 10, fontSize: 10},
        tabBarStyle: {
          padding: 10,
          height: 60,
          borderTopColor: primaryColor,
          borderTopWidth: 1,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === secondName) {
            iconName = focused ? 'list' : 'list-outline';
          }
          //returning an icon component
          else if (rn == customerCare) {
            return (
              <AntDesign name={'customerservice'} size={size} color={color} />
            );
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name={homeName} component={Home} />
      <Tab.Screen name={customerCare} component={CustomerCare} />
      <Tab.Screen name={secondName} component={Second} />
    </Tab.Navigator>
  );

  const ChatStack = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Chat" component={CustomerCare} />
          <Stack.Screen name="Tabs" component={NavTabs} />
          <Stack.Screen name="test" component={Third}/>
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Tabs" component={NavTabs} />
          <Stack.Screen name="test" component={Third}/>

        </>
      )}
    </Stack.Navigator>
  );
  return (
    <PaperProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <AuthenticatedUserProvider>
            <AppBar />
            <ChatStack />
          </AuthenticatedUserProvider>
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
