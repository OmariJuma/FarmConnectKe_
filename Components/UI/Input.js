import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {TextInput, Button, Avatar} from 'react-native-paper';
import paperIcon from './paperIcon.png';
import {primaryColor} from './AppBar';
import {articles} from './data';
import { ref, update} from 'firebase/database';
import {database} from '../../firebase';
import uuid  from 'react-native-uuid';
const Input = props => {
  const [newComment, setNewComment] = useState({});
  const [isValid, setIsValid] = useState(true);
  const addComment=(name, date, comment, articleId)=>{
    const newId = uuid.v4();
    update(ref(database, '/Articles/'+articleId+'/comments/'+newId),{
      id:newId,
      name: name,
      date:date,
      comment: comment,
      articleId: props.id
    })
  }
  const submitHandler = () => {
    if (newComment.comment.trim().length > 0) {
      setIsValid(true);
      addComment(newComment.name, newComment.date, newComment.comment, props.id);
      setNewComment('');
    } else {
      setIsValid(false);
      console.log('empty message');
    }
  };
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}>
      <TextInput
        label={isValid ? 'Add a comment...' : 'Please enter a comment'}
        multiline={true}
        numberOfLines={5}
        underlineColor={isValid ? primaryColor : 'tomato'}
        activeUnderlineColor={isValid ? primaryColor : 'tomato'}
        value={newComment}
        onChange={e => {
          setIsValid(true);
          setNewComment({
            name: 'Kimani',
            date: '15/7/2023',
            comment: e.nativeEvent.text,
          });
        }}
        style={{
          backgroundColor: '#f2f8f9',
          flex: 1,
          borderWidth: 1,
          borderColor: isValid ? primaryColor : 'tomato',
        }}
      />
      <TouchableOpacity onPress={submitHandler}>
        <Avatar.Icon
          style={{backgroundColor: primaryColor}}
          icon={paperIcon}
          size={50}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Input;
