import React, {
  createContext,
  lazy,
  useContext,
  useEffect,
  useState,
} from 'react';
import {ActivityIndicator, PaperProvider, Text} from 'react-native-paper';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {primaryColor} from './Components/UI/AppBar';
import Home from './Components/Pages/Home';
import ReadArticle from './Components/Pages/ReadArticle';
import Login from './Components/Pages/Login';
import Signup from './Components/Pages/Signup';
import Bookmark from './Components/Pages/Bookmark';
import CustomerCare from './Components/Pages/CustomerCare';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './firebase';
import {
  AuthenticatedUserProvider,
  AuthenticatedUserContext,
} from './Store/Provider';
import Logo from './assets/farmConnect.png';
import AllArticles from './Components/Pages/AllArticles';

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const {user, setUser} = useContext(AuthenticatedUserContext);
  const homeName = 'Home';
  const ReadArticleName = 'Read Article';
  const customerCare = 'Customer Care';
  const BookmarkName = 'Bookmark';
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    fetchData();
  }, []);

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
          } else if (rn === BookmarkName) {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
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
      <Tab.Screen
        name={BookmarkName}
        component={Bookmark}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: primaryColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTitle: '',
        }}
      />
    </Tab.Navigator>
  );

  const ChatStack = () => (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Tabs" component={NavTabs} />
      <Stack.Screen
        name={ReadArticleName}
        component={ReadArticle}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: primaryColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTitle:" ",
        }}
      />
      <Stack.Screen
        name="AllArticles"
        component={AllArticles}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: primaryColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTitle: 'All Articles',
        }}
      />
    </Stack.Navigator>
  );
  return (
    <>
      {isLoading && (
        <Image
          source={Logo}
          style={{display: 'flex', alignSelf: 'center', marginVertical: '50%'}}
        />
      )}
      {!isLoading && (
        <PaperProvider>
          <NavigationContainer>
            <SafeAreaView style={styles.container}>
              <AuthenticatedUserProvider>
                <ChatStack />
              </AuthenticatedUserProvider>
            </SafeAreaView>
          </NavigationContainer>
        </PaperProvider>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
