import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import { primaryColor } from './AppBar';

const AvatarIconText = (props) => {
  return (
    <TouchableOpacity style={{display: 'flex', alignItems: 'center'}}>
      <Avatar.Icon icon={props.icon} size={props.size} style={{backgroundColor:primaryColor}}/>
      <Avatar.Text
        label={props.label}
        color="black"
        labelStyle={{fontSize: 14, width:80}}
        style={{backgroundColor: 'transparent'}}
      />
    </TouchableOpacity>
  );
};

export default AvatarIconText;
