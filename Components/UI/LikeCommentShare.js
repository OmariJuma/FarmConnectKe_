import * as React from 'react';
import {View} from 'react-native';
import {Avatar} from 'react-native-paper';
import {primaryColor} from './AppBar';
import AvatarIconText from './AvatarIconText';
const LikeCommentShare = () => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
      }}>
      <AvatarIconText label="Like" icon="heart" size={40} />
      <AvatarIconText label="Comment" icon="comment" size={40} />
      <AvatarIconText label="Share" icon="share" size={40} />
    </View>
  );
};

export default LikeCommentShare;
