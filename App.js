import React, {lazy} from 'react';
import {PaperProvider} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppBar, {primaryColor} from './Components/UI/AppBar';
import Home from './Components/Pages/Home';
import Second from './Components/Pages/Second';
import Ionicons from 'react-native-vector-icons/Ionicons';

function App() {
  // const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const homeName = 'Home';
  const secondName = 'Second';

  return (
    <PaperProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <AppBar />
          <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) => ({
              lazy: false,
              headerShown: false,
              tabBarActiveTintColor: primaryColor,
              tabBarInactiveTintColor: 'grey',
              tabBarLabelStyle: {paddingBottom: 10, fontSize: 10},
              tabBarStyle: {padding: 10, height: 60, borderTopColor:primaryColor, borderTopWidth:1},
              tabBarIcon: ({focused, color, size}) => {
                let iconName;
                let rn = route.name;

                if (rn === homeName) {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (rn === secondName) {
                  iconName = focused ? 'list' : 'list-outline';
                }
                //returning an icon component
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}>
            <Tab.Screen name={homeName} component={Home} />
            <Tab.Screen name={secondName} component={Second} />
          </Tab.Navigator>
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

export default App;
