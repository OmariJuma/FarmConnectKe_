import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {IconButton} from 'react-native-paper';
export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const CarouselCardItem = ({item, index}) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={{uri: item.imgUrl}} style={styles.image} alt='customer care'/>
      <Text style={styles.body}>
        {item.body}
        {item.isOnline ? 'Online' : 'Offline'}
      </Text>
      <IconButton
        icon="checkbox-blank-circle"
        iconColor={item.isOnline ? '#5BF541' : 'red'}
        style={{position: 'absolute', right: -20, marginTop: -15}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 25,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH / 1.5,
    height: 100,
  },
  header: {
    color: '#222',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: '#222',
    fontSize: 18,
    paddingLeft: 20,
    textAlign: 'center',
    paddingRight: 20,
  },
});

export default CarouselCardItem;
