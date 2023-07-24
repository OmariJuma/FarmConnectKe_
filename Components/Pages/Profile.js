import React, {useContext} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Text } from 'react-native-paper';
import UserAvatar from "react-native-user-avatar"
import { primaryColor, primaryColorVariant } from '../UI/AppBar';
import {AuthenticatedUserContext} from '../../Store/Provider';

const deviceWidth= (Dimensions.get("window").width)/2-20

const Profile = () => {
  const {user} = useContext(AuthenticatedUserContext);
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
      <UserAvatar
          color={primaryColor}
          name={user.firstName+" "+user.secondName}
          size={100}
        />
        <View>
        <Text style={styles.username}>
        {user.firstName+" "+user.secondName}       
         </Text>
        <Text style={styles.userText}>{user.email}</Text>
        <Text style={styles.userText}>{user.phoneNo}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button textColor='white' style={styles.buttonAlt} >View Stats</Button>
        <Button textColor={primaryColor}  style={styles.button} >Edit Profile</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop:20,
    backgroundColor:"white"
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginStart:20,
alignSelf:"flex-start", 
 gap:20
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color:primaryColor,
    marginLeft: 10,
  },
  userText:{
    fontSize: 16,
    marginStart: 10,
    lineHeight:30,
    fontWeight:"700",
    color:primaryColorVariant

  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 10,

  },
  button: {
    backgroundColor:"#f9f9f9",
    width:deviceWidth,
    marginHorizontal: 10,
    borderColor:primaryColor,
    borderWidth:1
},
  buttonAlt:{
    backgroundColor:primaryColor,
    width:deviceWidth,
    marginHorizontal: 10,

  }
});

export default Profile;
