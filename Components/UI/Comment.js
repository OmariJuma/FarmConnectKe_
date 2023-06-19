import React, {useState} from 'react';
import {View, Text, Image, Touchable, TouchableOpacity} from 'react-native';
import {Card, Avatar} from 'react-native-paper';
import LikeBtn from './LikeBtn';
import CommentBtn from './CommentBtn';
import ShareBtn from './ShareBtn';
import {primaryColor, primaryColorVariant} from './AppBar';

const Comment = props => {
  //   const [comment, setComment] = useState('');
  return (
    <Card
      style={{
        marginTop: 20,
        backgroundColor: 'white',
        shadowColor: 'black',
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: 20,
          paddingLeft: 10,
          paddingBottom: 10,
        }}>
        <Image
          source={{uri: 'https://picsum.photos/id/12/200/300'}}
          style={{width: 50, height: 50, borderRadius: 25}}
        />

        <View
          style={{display: 'flex', flexDirection: 'column', marginLeft: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 17}}>{props.name} </Text>
          <View
            style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'row',
            }}>
            <Avatar.Icon
              icon="clock"
              size={30}
              color="grey"
              style={{backgroundColor: 'transparent'}}
            />
            <Text style={{color: 'grey', fontSize: 12}}>{props.date}</Text>
          </View>
        </View>
      </View>
      <Text style={{paddingHorizontal: 10, marginBottom: 10}}>
        {props.text}
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          paddingLeft: 10,
          paddingBottom: 10,
        }}>
        <LikeBtn likes={1} isArticle={false}/>
        <CommentBtn />
        <ShareBtn />
      </View>
    </Card>
  );
};

export default Comment;
