import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';
import { primaryColorVariant } from './AppBar';
const LikeBtn = () => {
    const [like, setLike] = useState(false);
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
        setLike(!like);
        setCount(() => {
          if (like) {
            return count - 1;
          } else {
            return count + 1;
          }
        });
      }}>
      <Avatar.Icon
        color={like?"red" : primaryColorVariant}
        icon={like ? 'heart' : 'heart-outline'}
        size={40}
        style={{backgroundColor: 'transparent'}}
      />
      <Text style={{color: like ? 'red' : primaryColorVariant}}>{count}</Text>
    </TouchableOpacity>
  );
};

export default LikeBtn;
