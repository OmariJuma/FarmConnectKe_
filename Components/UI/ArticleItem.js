import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View} from 'react-native';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import {grey, primaryColor} from './AppBar';
import ArticleInfo from './ArticleInfo';

const ArticleItem = (props, {nav}) => {
  const handlePress = () => {
    props.nav.navigate('Second', {
      articleId: props.id,
    });
    console.log(props.id);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{uri: props.image}} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text
            style={{
              color: primaryColor,
              marginLeft: 20,
              backgroundColor: 'white',
              borderTopRightRadius: 20,
              borderBottomColor: primaryColor,
              borderBottomWidth: 1,
            }}>
            Category: {props.category}
          </Text>
          <Card.Title
            titleNumberOfLines={10}
            title={props.title}
            titleStyle={{
              fontSize: 16,
              color: 'black',
              textAlign: 'center',
              fontWeight: 'bold',
              marginTop: 15,
            }}
          />
          <Card.Content>
            <View style={{marginTop: 20}}>
              <ArticleInfo
                author={props.author}
                date={props.date}
                size={30}
              />
            </View>
          </Card.Content>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    // backgroundColor:"grey",
    borderRadius: 20,
    margin: 20,
    borderWidth: 2,
    borderColor: primaryColor,
  },
  imageContainer: {
    width: '40%',
    // paddingRight: 10,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
  textContainer: {
    width: '60%',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ArticleItem;
