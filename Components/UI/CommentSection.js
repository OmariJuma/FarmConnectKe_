import React from 'react';
import {View, Image} from 'react-native';
import {Card, Text} from 'react-native-paper';
import Comment from './Comment';
// import {articles} from './data';
const CommentSection = (props) => {  
  console.log(props.id);
  const render=()=>{
    if(props.id && props.comments){
      return props.comments.map((comment,index)=>{
        return <Comment key={index} id={props.id} text={comment.comment} name={comment.name} date={comment.date} likes={props.likes}/>
      })
      
    }
    else{
      return <text>No comments yet</text>
    }
    

  
  }
  return (
    <View style={{padding:10, elevation:1}}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          marginTop: 30,
        }}>
        Comments 
      </Text>
      {render()}
    </View>
  );
};

export default CommentSection;
