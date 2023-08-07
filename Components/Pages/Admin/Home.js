import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import image1 from '../../../assets/green.jpeg';
import image2 from '../../../assets/head.jpg';
import image3 from '../../../assets/chatting.jpeg';
import { Card, Text } from 'react-native-paper';
import { database } from '../../../firebase';
import { ref, onValue } from 'firebase/database';
import {Toast} from "toastify-react-native"
import AppBar from '../../UI/AppBar';

const AdminHome = ({navigation}) => {
  const [usersList, setUsersList] = useState([]);
  const [articlesList, setArticlesList] = useState([]);
  const [chatsList, setChatsList] = useState([]);

  const fetchData = () => {
    try {
      // Fetch Users data
      const usersRef = ref(database, 'Users/');
       onValue(usersRef, snapshot => {
        if (snapshot.val()) {
          setUsersList(Object.values(snapshot.val()));
        } else {
          Toast.error('No Users data available', 'top');
        }
      });

      // Fetch Articles data (Assuming you have a 'Articles/' node in your Firebase database)
      const articlesRef = ref(database, 'Articles/');
       onValue(articlesRef, snapshot => {
        if (snapshot.val()) {
          setArticlesList(Object.values(snapshot.val()));
        } else {
          Toast.error('No Articles data available');
        }
      });

      // Fetch Chats data (Assuming you have a 'Chats/' node in your Firebase database)
      const chatsRef = ref(database, 'Chats/');
       onValue(chatsRef, snapshot => {
        if (snapshot.val()) {
          setChatsList(Object.values(snapshot.val()));
        } else {
          Toast.error('No Chats data available');
        }
      });
    } catch (error) {
      Toast.error('Error fetching data:', error);
    }
  };

  // Call the fetchData function when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const itemsList = [
    { itemName: 'Users', image: image1, count: usersList.length, screen: "All Users", data: usersList },
    { itemName: 'Articles', image: image2, count: articlesList.length, screen: "All Articles", data: articlesList },
    { itemName: 'Chats', image: image3, count: chatsList.length, screen: "All Chats", data: chatsList },
  ];

  return (
    <ScrollView style={styles.container}>
      <AppBar/>
      <View style={styles.contentContainer}>
        <Text style={{fontSize:28, textDecorationLine:"underline", marginVertical:20,}}>Highlights</Text>
        {itemsList.map((item, index) => (
          <Card key={index} style={{ width: screenWidth - 20, marginVertical: 25 }} onPress={()=>navigation.navigate(item.screen, {data: item.data})}>
            <Card.Cover source={item.image} />
            <Card.Title
              title={`Total ${item.itemName}: ${item.count}`}
              titleStyle={{
                color: index === 2 ? 'black' : 'white',
                fontWeight: 'bold',
                fontSize: 28,
                paddingVertical: 20,
              }}
              style={styles.text}
            />
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    top: 20,
  },
  image: {
    width: screenWidth - 20,
    height: 200,
    resizeMode: 'cover',
    marginVertical: 10,
  },
});

export default AdminHome;
