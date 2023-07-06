import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {primaryColor, primaryColorVariant} from './AppBar';
import ArticleItem from './ArticleItem';
import {articles} from './data';
import {Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const TabbedLayout = ({navigation}) => {
  const ScreenWidth= Dimensions.get("window").width;
  return (
    <Card
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 20,
        marginHorizontal: 15,
        marginBottom: 20,
        paddingBottom: 10,
      }}>
      <View style={{display:"flex", flexDirection:"row",  alignItems:"center", gap:ScreenWidth-210}}>
        <Text
          style={{
            marginTop: 10,
            paddingTop: 5,
            fontWeight: 'bold',
            color: 'black',
            fontSize: 15,
            marginLeft: 20,
            marginBottom:20,
            textAlign: 'left',
            color:primaryColor
          }}>
          Trending Articles
        </Text>
        <TouchableOpacity >
        <Icon size={17} color={primaryColor} name="arrow-right" onPress={navigation.navigate("allArticles")}/>
        </TouchableOpacity>
      </View>
      {articles.map(article => (
        <ArticleItem
          key={article.id}
          id={article.id}
          title={article.title}
          category={article.category}
          date={article.date}
          author={article.author}
          image={article.imageUrl}
          text={article.text}
          nav={navigation}
        />
      ))}
    </Card>
  );
};

export default TabbedLayout;
