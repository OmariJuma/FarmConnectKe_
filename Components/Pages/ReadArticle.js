import React,{useContext, useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
// import {articles} from '../UI/data';
import ArticleInfo from '../UI/ArticleInfo';
import Input from '../UI/Input';
import CommentSection from '../UI/CommentSection';
import LikeBtn from '../UI/LikeBtn';
import ShareBtn from '../UI/ShareBtn';
import { AuthenticatedUserContext } from '../../Store/Provider';
const ReadArticle = ({navigation, route}) => {
  const {articles} = useContext(AuthenticatedUserContext);
  var id = 1;
  if (route.params) {
    id = route.params.articleId;
  }
  // console.log(articles[id-1].comments);
  const [comments, setComments] = React.useState(Object.values(articles[id-1].comments));
  // React.useEffect(() => {

  // },[]);
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      {id && (
        <View style={styles.container}>
          <Text style={styles.title}>{articles[id - 1].title}</Text>

          <ArticleInfo
            author={articles[id - 1].author}
            date={articles[id - 1].date}
            size={40}
          />
          <Image
            source={{uri: articles[id - 1].imageUrl}}
            style={styles.image}
            alt="background"
          />
          <Text style={{color: 'grey', marginBottom: 10, textAlign: 'center'}}>
            Image source: {articles[id - 1].imageUrl}
          </Text>
          <Text style={styles.text}>{articles[id - 1].text}</Text>
          {/* <LikeCommentShare/> */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20,
            }}>
            <LikeBtn likes={route.params.likes} isArticle={true} />
            {/* <CommentBtn /> */}
            <ShareBtn />
          </View>
          <Input id={id} />
          <CommentSection id={id} comments={comments} />
        </View>
      )}
      {!id && <Text>Nothing</Text>}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    marginBottom: 20,
    letterSpacing: 1.5,
  },
  text: {
    fontSize: 16,
    textAlign: 'justify',
    marginTop: 10,
    marginBottom: 10,
    letterSpacing: 1,
    lineHeight: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default ReadArticle;
