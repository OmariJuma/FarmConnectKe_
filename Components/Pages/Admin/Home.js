import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import image1 from '../../../assets/green.jpeg';
import image2 from '../../../assets/head.jpg';
import image3 from '../../../assets/chatting.jpeg';
import {Card} from 'react-native-paper';

const AdminHome = () => {
  const itemsList = [
    {itemName: 'Users', image: image1},
    {itemName: 'Articles', image: image2},
    {itemName: 'Chats', image: image3},
  ];
  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        {itemsList.map((item, index) => (
          <Card key={index} style={{width: screenWidth - 20, marginVertical: 25}}>
            <Card.Cover source={item.image} />
            <Card.Title
              title={'Total ' + item.itemName}
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
