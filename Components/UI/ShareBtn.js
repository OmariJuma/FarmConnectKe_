import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';
import {primaryColorVariant} from './AppBar';
const ShareBtn = () => {
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
      >
      <Avatar.Icon
        color={primaryColorVariant}
        icon={'share'}
        size={40}
        style={{backgroundColor: 'transparent'}}
      />
      <Text style={{color: primaryColorVariant}}>share</Text>
      {/* <TextInput/> */}
    </TouchableOpacity>
  );
};

export default ShareBtn;
