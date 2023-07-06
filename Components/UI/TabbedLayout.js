import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {primaryColor} from './AppBar';
import ArticleItem from './ArticleItem';
import {articles} from './data';
import {Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const TabbedLayout = ({navigation}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, styles.headerTextTitle]}>
          Trending Articles
        </Text>
        <Button
          onPress={() => navigation.navigate('AllArticles')}
          style={[styles.headerText]}>
          <Text style={[styles.headerText]}>
            All Articles  </Text>
          <Icon size={17} style={[styles.headerText]} name="arrow-right" />
        </Button>
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

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    // borderRadius: 40,
    // marginHorizontal: 15,
    marginBottom: 20,
    paddingBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerText: {
    marginTop: 10,
    paddingTop: 5,
    color: primaryColor,
  },
  headerTextTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default TabbedLayout;
