import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {primaryColor} from '../../Components/UI/AppBar';
import Home from '../../Components/Pages/Home';
import ReadArticle from '../../Components/Pages/ReadArticle';
import Login from '../../Components/Pages/Login';
import Signup from '../../Components/Pages/Signup';
import Bookmark from '../../Components/Pages/Bookmark';
import CustomerCare from '../../Components/Pages/CustomerCare';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Profile from '../../Components/Pages/Profile';
import ArticleCreator from '../../Components/Pages/Editor';
import AdminHome from '../../Components/Pages/Admin/Home';
import AddUser from '../../Components/Pages/Admin/AddUser';
import {AuthenticatedUserContext} from '../../Store/Provider';
import AllUsers from '../Pages/Admin/AllUsers';
import AllArticles from '../Pages/Admin/AllArticles';
import AllChats from '../Pages/Admin/AllChats';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const homeName = 'Home';
const ReadArticleName = 'Read Article';
const customerCare = 'Customer Care';
const CreateArticle = 'Create Article';
const profileName = 'Profile';

const UserNavTabs = () => (
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
    <Tab.Screen name={homeName} component={Home} />
    <Tab.Screen name={customerCare} component={CustomerCare} />
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

const AdminStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="AdminHome"
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

          if (rn === 'AdminHome') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === 'AddUser') {
            iconName = focused ? 'person-add' : 'person-add-outline';
          } else if (rn === 'CustomerCare') {
            return (
              <AntDesign name={'customerservice'} size={size} color={color} />
            );
          } else if (rn === 'ArticleCreator') {
            iconName = focused ? 'add-circle-sharp' : 'add-circle-outline';
          } else if (rn === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="AdminHome" component={AdminHome} />
      <Tab.Screen name="AddUser" component={AddUser} />
      <Tab.Screen name="CustomerCare" component={CustomerCare} />
      <Tab.Screen
        name="ArticleCreator"
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
      <Tab.Screen component={Profile} name="Profile" />
    </Tab.Navigator>
  );
};

const DrawerNav = () => (
  <Drawer.Navigator
    initialRouteName="ChatStack"
    // drawerContent={props => <DrawerContent {...props} />}
    screenOptions={{
      headerShown: false,
      drawerPosition: 'right',
      drawerIcon: () => <Ionicons name="menu" size={18} color={primaryColor} />,
    }}>
    <Drawer.Screen name="ChatStack" component={UserNavTabs} />
    <Drawer.Screen name="CreateArticle" component={ArticleCreator} />
    <Drawer.Screen name="CustomerCare" component={CustomerCare} />
    <Drawer.Screen name="Profile" component={Profile} />
  </Drawer.Navigator>
);

export const ChatStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ animation: 'slide_from_right'}}>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}}/>
      <Stack.Screen name="AdminTabs" component={AdminStack} options={{headerShown:false}}/> 
      <Stack.Screen name="UserTabs" component={UserNavTabs} options={{headerShown:false}}/>
      <Stack.Screen name="editor" component={ArticleCreator} />
      <Stack.Screen name="All Users" component={AllUsers} />
      <Stack.Screen name="All Articles" component={AllArticles}  />
      <Stack.Screen name="All Chats" component={AllChats} />


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
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="AdminHome" component={AdminStack} />
    </Stack.Navigator>
  );
};
