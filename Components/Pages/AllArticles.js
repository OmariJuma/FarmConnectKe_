import {Text} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from 'react-native';
import {articles} from '../UI/data';
import ArticleItem from '../UI/ArticleItem';

const AllArticles = ({navigation}) => {
  const uniqueCategories = [
    ...new Set(articles.map(article => article.category))];
  console.log(uniqueCategories.sort());
  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        {uniqueCategories}
      </ScrollView>
      <ScrollView>
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
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    //   flexDirection: 'row',
    paddingVertical: 20,
    height: 100,
  },
  item: {
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});
export default AllArticles;
