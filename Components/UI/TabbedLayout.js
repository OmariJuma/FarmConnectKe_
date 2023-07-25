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
    const databaseFetch = () => {
      try {
        return onValue(ref(database, 'Articles/'), snapshot => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            console.log(data);
            setArticles(Object.values(data));
          } else {
            // Handle case when no data exists at the specified location
            console.log('No data found in the "Articles/" location.');
            setArticles([]); // Set articles state to an empty array or handle differently based on your requirement
          }
        }, error => {
          // Handle error if there's an issue with Firebase data retrieval
          console.error('Error fetching data:', error);
          // You can set an error state or show an error message to the user
        });
      } catch (error) {
        // Handle any other unexpected errors
        console.error('Unexpected error:', error);
        // You can set an error state or show an error message to the user
      }
    };
    
    databaseFetch();
  
    // Return a cleanup function to unsubscribe the database listener when the component unmounts
    // return () => {
    //   // Assuming you are using the same Firebase version you mentioned earlier
    //   // If not, check your Firebase SDK documentation on how to detach the onValue listener
    //   off(ref(database, 'Articles/'));
    // };
  }, []);
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
          imageString={article.image}
          mimeType={article.mimeType}
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
