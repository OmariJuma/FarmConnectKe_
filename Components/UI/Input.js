import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {TextInput, Button, Avatar} from 'react-native-paper';
import paperIcon from './paperIcon.png';
import {primaryColor} from './AppBar';

const Input = () => {
  const [newComment, setNewComment] = useState('');
  const [isValid, setIsValid] = useState(true);

  const submitHandler = () => {
    if (newComment.trim().length > 0) {
      setIsValid(true);
      console.log(newComment);
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
          setNewComment(e.nativeEvent.text);
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
