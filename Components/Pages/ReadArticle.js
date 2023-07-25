import React,{ useState} from 'react';
import { Text} from 'react-native-paper';
import {Image, ScrollView, StyleSheet, View, Dimensions} from 'react-native';
import ArticleInfo from '../UI/ArticleInfo';
import Input from '../UI/Input';
import CommentSection from '../UI/CommentSection';
import LikeBtn from '../UI/LikeBtn';
import ShareBtn from '../UI/ShareBtn';
import {onValue, ref} from 'firebase/database';
import {database} from '../../firebase';
import { WebView } from 'react-native-webview';
const ReadArticle = ({route}) => {
  const deviceWidth= (Dimensions.get("window").width)-20

  const [filteredArticle, setFilteredArticle] = useState([]);
  const id = route.params.articleId;
  const [comments, setComments] = React.useState([]);
  React.useEffect(() => {
    const fetchArticle = () => {
      onValue(ref(database,"Articles/"+id), snapshot => {
        if(snapshot.val()){
          setFilteredArticle(snapshot.val())
          console.log("the article")
          console.log(snapshot.val())
        }
      })
    }
    const databaseFetch= ()=>{
    return onValue(ref(database, '/Articles/'+id+'/comments'), snapshot =>{
      if(snapshot.exists()){
        const data = snapshot.val();   
        setComments(Object.values(data));
      }
    })
    }
    fetchArticle();
    databaseFetch();
  },[]);
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      {id && (
        <View style={styles.container}>
          <Text style={styles.title}>{filteredArticle.title}</Text>

          <ArticleInfo
            author={filteredArticle.authorName}
            date={filteredArticle.date}
            size={40}
          />
          <Image
            source={{uri: filteredArticle.imageUrl}}
            style={styles.image}
            alt="background"
          />
          <Text style={{color: 'grey', marginBottom: 10, textAlign: 'center'}}>
            Image source: {filteredArticle.imageUrl}
          </Text>
          <WebView
          originWhitelist={['*']}
          source={{html: `<body style="display:flex; flex-direction: column;justify-content: center; 
          align-items:center;  color:black;width: 100%; height: 100%; font-size:20px">${filteredArticle.text}</body>`}}
          textZoom={340}
          style={{minHeight:500, width: deviceWidth}}
          />
          {/* <LikeCommentShare/> */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20,
            }}>
            <LikeBtn likes={route.params.likes} isArticle={true} id={id}/>
            {/* <CommentBtn /> */}
            <ShareBtn />
          </View>
          <Input id={id} />
          <CommentSection id={id} comments={comments}/>
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
