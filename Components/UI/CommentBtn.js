import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Avatar, TextInput} from 'react-native-paper';
import { primaryColor, primaryColorVariant } from './AppBar';
const CommentBtn = () => {
    const [comment, setComment] = useState("");
    let [count, setCount] = useState(0);
  
  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingLeft: 10,
        paddingBottom: 10,
      }}
      onPress={() => {
        setCount(count + 1);
      }}>
      <Avatar.Icon
        color={primaryColorVariant}
        icon={ 'comment'}
        size={40}
        style={{  backgroundColor:"transparent"}}
      />
      <Text style={{color: primaryColorVariant}}>{count}</Text>
      {/* <TextInput/> */}
    </TouchableOpacity>
  );
};

export default CommentBtn;
