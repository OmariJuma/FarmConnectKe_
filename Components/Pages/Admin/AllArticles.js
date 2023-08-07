import React from 'react';
import {Button, Card, Text} from 'react-native-paper';
import {ScrollView, Dimensions, Alert} from 'react-native';
import {primaryColor} from '../../UI/AppBar';
import {Toast} from 'toastify-react-native';
import {ref, remove} from 'firebase/database';
import {database} from '../../../firebase';

const cardWidth = Dimensions.get('window').width - 20;

const AllArticles = ({route, navigation}) => {
  const {data} = route.params;
  const deleteHandler = id => {
    Alert.alert(
      'Are you sure you want to delete?',
      "Press 'No' to cancel\nPress 'Yes' to delete",
      [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: () => {
            remove(ref(database, 'Articles/' + id)).then(snapshot => {
              console.log('After deletion', snapshot);
              Toast.success('Article deleted successfully', 'top');
            });
          },
        },
      ],
    );
  };

  //   const editHandler = article => {
  //     Alert.alert(
  //       'Are you sure you want to edit this article?',
  //       "Press 'No' to cancel\nPress 'Yes' to proceed",
  //       [
  //         {
  //           text: 'No',
  //         },
  //         {
  //           text: 'Yes',
  //           onPress: () => {
  //             navigation.navigate('Create Article', {article: article});
  //           },
  //         },
  //       ],
  //     );
  //   };

  return (
    <ScrollView contentContainerStyle={{    flexGrow: 1,
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: 'white',
    }}>
      <Text style={{fontSize: 25, fontWeight: 'bold', marginVertical: 30}}>
        All Articles
      </Text>
      {data.map(article => (
        <Card
          key={article.id}
          style={{
            backgroundColor: '#f9f9f9',
            width: cardWidth,
            marginBottom: 30,
          }}>
          <Card.Cover source={{uri: `data:${article.mimeType};base64,${article.image}`}} />
          <Card.Title title={article.title} subtitle={article.authorName} />
          <Card.Content>{/* <Text>{article.text}</Text> */}</Card.Content>
          <Card.Actions>
            <Button
              icon="pencil"
              style={{borderColor: primaryColor}}
              textColor={primaryColor}
              onPress={() => navigation.navigate('editor', {article: article})}>
              Edit
            </Button>
            <Button
              buttonColor="tomato"
              icon={'delete'}
              textColor="white"
              onPress={() => deleteHandler(article.id)}>
              Delete
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
};

export default AllArticles;
