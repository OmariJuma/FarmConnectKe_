import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {primaryColor} from './AppBar';
import ArticleItem from './ArticleItem';
import {Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {onValue, ref} from 'firebase/database';
import {database} from '../../firebase';
import {AuthenticatedUserContext} from '../../Store/Provider';

const TabbedLayout = ({navigation}) => {
  const {articles, setArticles} = useContext(AuthenticatedUserContext);

  React.useEffect(() => {
    const databaseFetch= ()=>{
    return onValue(ref(database, '/Articles/'), snapshot =>{
      if(snapshot.exists()){
        const data = snapshot.val();   
        setArticles(data.filter(article => article.id >0 ));
      }
    })
    }
    databaseFetch();
  },
    []);
  return (
    <Card style={styles.card}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, styles.headerTextTitle]}>
          Trending Articles
        </Text>
        <Button
          onPress={() => navigation.navigate('AllArticles')}
          style={[styles.headerText]}>
          <Text style={[styles.headerText]} onPress={()=>navigation.navigate("editor")}>
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
          likes={article.likes?article.likes.likes:0}
          comments={article.comments}
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
