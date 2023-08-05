import React, {useContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {primaryColor} from '../../Components/UI/AppBar';
import Home from '../../Components/Pages/Home';
import ReadArticle from '../../Components/Pages/ReadArticle';
import Login from '../../Components/Pages/Login';
import Signup from '../../Components/Pages/Signup';
import Bookmark from '../../Components/Pages/Bookmark';
import CustomerCare from '../../Components/Pages/CustomerCare';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AllArticles from '../../Components/Pages/AllArticles';
import Profile from '../../Components/Pages/Profile';
import ArticleCreator from '../../Components/Pages/Editor';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import AdminHome from '../../Components/Pages/Admin/Home';
import AddUser from '../../Components/Pages/Admin/AddUser';
import {AuthenticatedUserContext} from '../../Store/Provider';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const homeName = 'Home';
const ReadArticleName = 'Read Article';
const customerCare = 'Customer Care';
const CreateArticle = 'Create Article';
const profileName = 'Profile';

export const NavTabs = () => {
    const {user} = useContext(AuthenticatedUserContext);
  
    return (
      <Tab.Navigator
        initialRouteName={homeName}
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
            // position: "relative",
            // bottom: 0,
            // elevation: 0,
          },
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;
  
            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === CreateArticle) {
              iconName = focused ? 'add-circle-sharp' : 'add-circle-outline';
            } else if (rn === 'Add User') {
              iconName = focused ? 'person-add' : 'person-add-outline';
            }
            //returning an icon component
            else if (rn === customerCare) {
              return (
                <AntDesign name={'customerservice'} size={size} color={color} />
              );
            } else if (rn === profileName) {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        {user?.userRole == 'Customer Care' ? (
          <Tab.Screen name={homeName} component={AdminHome} />
        ) : (
          <Tab.Screen name={homeName} component={Home} />
        )}
        <Tab.Screen name={customerCare} component={CustomerCare} />
        {user?.userRole == 'Customer Care' && (
          <Tab.Screen name={'Add User'} component={AddUser} />
        )}
        <Tab.Screen
          name={CreateArticle}
          component={ArticleCreator}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerTitle: 'Create Article',
          }}
        />
        <Tab.Screen component={Profile} name={profileName} />
      </Tab.Navigator>
    );
  };
  
export const ChatStack = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
    <Stack.Screen name="Tabs" component={NavTabs} />
    <Stack.Screen name="editor" component={ArticleCreator} />
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
        headerTitle: ' ',
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
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Admin Home" component={AdminHome} />
  </Stack.Navigator>
);

const Drawer = createDrawerNavigator();

const DrawerNav = () => (
  <Drawer.Navigator
    initialRouteName="ChatStack"
    // drawerContent={props => <DrawerContent {...props} />}
    screenOptions={{
      headerShown: false,
      drawerPosition: 'right',
      drawerIcon: () => <Ionicons name="menu" size={18} color={primaryColor} />,
    }}>
    <Drawer.Screen name="ChatStack" component={ChatStack} />
    <Drawer.Screen name="CreateArticle" component={ArticleCreator} />
    <Drawer.Screen name="CustomerCare" component={CustomerCare} />
    <Drawer.Screen name="Profile" component={Profile} />
  </Drawer.Navigator>
);
