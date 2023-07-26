import React, { useState, useContext } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import UserAvatar from "react-native-user-avatar"
import { primaryColor, primaryColorVariant } from '../UI/AppBar';
import { AuthenticatedUserContext } from '../../Store/Provider';
import { update, ref } from 'firebase/database';
import { Toast } from "toastify-react-native"
import { database } from '../../firebase';

const deviceWidth = (Dimensions.get("window").width) / 2 - 20;
const textInputWidth = Dimensions.get("window").width - 50; // Calculate TextInput width

const ViewStats = ({ user }) => {
  return (
    <View>
      <Text style={{ ...styles.userText, marginTop: 50 }}>Stats Section</Text>
    </View>
  );
};

const EditProfile = ({ user, onUpdateProfile }) => {
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [secondName, setSecondName] = useState(user.secondName);
  const [phoneNo, setPhoneNo] = useState(user.phoneNo);

  const updateProfile = () => {
    if (firstName === user.firstName && secondName === user.secondName && phoneNo === user.phoneNo && email === user.email) {
      Toast.error("No changes made", "top")
      return;
    }
    if (firstName === "" || secondName === "" || phoneNo === "" || email === "") {
      Toast.error("All fields are required", "top")
      return;
    }
    if (!email.includes("@")) {
      Toast.error("Invalid email", "top")
      return;
    }
    update(ref(database, "user/" + user.userId), {
      firstName: firstName,
      secondName: secondName,
      phoneNo: phoneNo,
      email: email
    }).then(() => {
      onUpdateProfile({
        ...user,
        firstName: firstName,
        secondName: secondName,
        phoneNo: phoneNo,
        email: email
      });
      Toast.success("Profile updated successfully", "top");
    }).catch((error) => {
      Toast.error("Error updating profile", "top");
    });
  }

  return (
    <View>
      <Text style={{ ...styles.userText, marginVertical: 30, fontSize: 25 }}>Edit Your Profile</Text>
      <TextInput
        mode="outlined"
        label="Enter First Name"
        placeholder="eg. John"
        value={firstName}
        style={{ ...styles.input, width: textInputWidth, backgroundColor: "#f9f9f9" }} // Use custom TextInput width
        onChangeText={text => setFirstName(text)}
      />
      <TextInput
        mode="outlined"
        label="Enter Second Name"
        value={secondName}
        placeholder="eg. Doe"
        style={{ ...styles.input, width: textInputWidth, backgroundColor: "#f9f9f9" }} // Use custom TextInput width
        onChangeText={text => setSecondName(text)}
      />
      <TextInput
        mode="outlined"
        label="Enter phone number"
        placeholder="eg. 07xxxxxxxx"
        textContentType="telephoneNumber"
        value={phoneNo}
        style={{ ...styles.input, width: textInputWidth, backgroundColor: "#f9f9f9" }} // Use custom TextInput width
        onChangeText={text => setPhoneNo(text)}
      />
      <TextInput
        mode="outlined"
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        value={email}
        label={'Email'}
        onChangeText={text => setEmail(text)}
        style={{ ...styles.input, width: textInputWidth, backgroundColor: "#f9f9f9" }} // Use custom TextInput width
      />
      <Button
        mode="contained"
        textColor={"white"}
        style={{ ...styles.button, width: textInputWidth, backgroundColor: primaryColor }}
        onPress={updateProfile}
      >
        Save Changes
      </Button>
    </View>
  );
};

const Profile = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleUpdateProfile = (updatedUser) => {
    setUser(updatedUser);
    setShowEditProfile(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        <UserAvatar
          color={primaryColor}
          name={user.firstName + " " + user.secondName}
          size={100}
        />
        <View>
          <Text style={styles.username}>
            {user.firstName + " " + user.secondName}
          </Text>
          <Text style={styles.userText}>{user.email}</Text>
          <Text style={styles.userText}>{user.phoneNo}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          textColor='white'
          style={styles.buttonAlt}
          onPress={() => setShowEditProfile(false)}
        >
          View Stats
        </Button>
        <Button
          textColor={primaryColor}
          style={styles.button}
          onPress={() => setShowEditProfile(true)}
        >
          Edit Profile
        </Button>
      </View>
      {showEditProfile
        ? <EditProfile user={user} onUpdateProfile={handleUpdateProfile} />
        : <ViewStats user={user} />
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: "white"
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginStart: 20,
    alignSelf: "flex-start",
    gap: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: primaryColor,
    marginLeft: 10,
  },
  userText: {
    fontSize: 16,
    marginStart: 10,
    lineHeight: 30,
    fontWeight: "700",
    color: primaryColorVariant

  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "#f9f9f9",
    width: deviceWidth,
    marginHorizontal: 10,
    borderColor: primaryColor,
    borderWidth: 1
  },
  buttonAlt: {
    backgroundColor: primaryColor,
    width: deviceWidth,
    marginHorizontal: 10,
  },
  input: {
    marginBottom: 20,
  },
});

export default Profile;