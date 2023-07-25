import React,{ useCallback, useState} from 'react';
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

  const [webViewHeight, setWebViewHeight] = useState(500);
  const [filteredArticle, setFilteredArticle] = useState([]);
  const id = route.params.articleId;
  const [comments, setComments] = React.useState([]);

  //web view functions
  const webViewInjectedJavaScript = `
  document.body.style.overflow = "hidden"; // Prevent vertical scroll inside the webview
  document.body.style.margin = "0"; // Remove any margin to avoid extra spacing
  window.ReactNativeWebView.postMessage(document.body.scrollHeight); // Send the content height to the parent component
`;
const onWebViewMessage = useCallback(( event) => {
  const height = parseInt(event.nativeEvent.data); // Get the height from the webview event
  console.log("height of html", height)
  setWebViewHeight(height); // Set the height of the webview
},[])
// this is the end of web view functions
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
          {/* <Text style={styles.title}>{filteredArticle.title}</Text> */}

          <ArticleInfo
            author={filteredArticle.authorName}
            date={filteredArticle.date}
            size={40}
          />
          {/* <Image
            source={{uri: filteredArticle.imageUrl}}
            style={styles.image}
            alt="background"
          /> */}
          {/* <Text style={{color: 'grey', marginBottom: 10, textAlign: 'center'}}>
            Image source: {filteredArticle.imageUrl}
          </Text> */}
          <WebView
          originWhitelist={['*']}
          scrollEnabled={true}
          onMessage={onWebViewMessage}
      injectedJavaScript={webViewInjectedJavaScript}
          source={{html: `<html>
          <head>
          <style>
          img{
              width: ${deviceWidth*2}px};
              height: 400px;
              margin-top: 50px;}
          </style>
          </head>
          <body style="display:flex; flex-direction: column;justify-content: center; 
          align-items:center;  color:black;width: 100%; font-size:30px">${filteredArticle.text}</body>`}}
          textZoom={200}
          // style={{flex:0,minHeight:1000, width: deviceWidth}}
          containerStyle={{flex:0,minHeight:webViewHeight/2, width: deviceWidth}}
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
