import React from 'react';
import {View, Image} from 'react-native';
import {Card, Text} from 'react-native-paper';
import Comment from './Comment';
const CommentSection = () => {
  return (
    <View style={{padding:10, elevation:1}}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          marginTop: 30,
        }}>
        Comments (20)
      </Text>
      <Comment />
    </View>
  );
};

export default CommentSection;
