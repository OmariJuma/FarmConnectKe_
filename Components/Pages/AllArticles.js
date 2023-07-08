import React, {useState} from "react";
import {Button, Text} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from 'react-native';
import {articles} from '../UI/data';
import ArticleItem from '../UI/ArticleItem';

const AllArticles = ({navigation}) => {
    const [activeCategory, setActiveCategory] = useState("All")
  var uniqueCategories = new Set();
  uniqueCategories.add("All");
   articles.forEach(category =>
    uniqueCategories.add(category.category)
  );
  console.log(uniqueCategories);
  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        {[...uniqueCategories].map((category) => (

          <Button onPress={()=>setActiveCategory(category)} key={category} style={[styles.item, {backgroundColor: activeCategory==category? "orange":"lightgreen"}]}>
            <Text>{category}</Text>
          </Button>
        ))}
      </ScrollView>
      <ScrollView style={{backgroundColor:"#fff"}}>
        {articles.filter(article =>activeCategory==="All"||article.category===activeCategory).map(article => (
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
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    height: 100,
  },
  item: {
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});
export default AllArticles;
