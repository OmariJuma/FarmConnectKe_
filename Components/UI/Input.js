import React, {useState, useContext} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {TextInput, Avatar} from 'react-native-paper';
import paperIcon from './paperIcon.png';
import {primaryColor} from './AppBar';
import {ref, update} from 'firebase/database';
import {database} from '../../firebase';
import uuid from 'react-native-uuid';
import {AuthenticatedUserContext} from '../../Store/Provider';

const Input = props => {
  const {user} = useContext(AuthenticatedUserContext);
  const [newComment, setNewComment] = useState({});
  const [isValid, setIsValid] = useState(true);
  const timezone = {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour12: false,
  };
  const date = new Date().toLocaleDateString('en-US', timezone);
  const time = new Date().toLocaleTimeString('en-US', timezone);

  const addComment = (name, date, time, comment, articleId) => {
    const newId = uuid.v4();
    update(ref(database, '/Articles/' + articleId + '/comments/' + newId), {
      id: newId,
      userId: user.userId,
      date: date,
      time: time,
      comment: comment,
      articleId: props.id,
    });
  };
  const submitHandler = () => {
    if (newComment.comment.trim().length > 0) {
      setIsValid(true);
      addComment(
        newComment.name,
        newComment.date,
        newComment.time,
        newComment.comment,
        props.id,
      );
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
            name: user.displayName,
            date: date,
            time: time,
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
