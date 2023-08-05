import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, Dimensions, ScrollView, Alert} from 'react-native';
import {Button, Card, Text, TextInput} from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import {primaryColor, primaryColorVariant} from '../UI/AppBar';
import {AuthenticatedUserContext} from '../../Store/Provider';
import {update, ref, onValue, remove} from 'firebase/database';
import {Toast} from 'toastify-react-native';
import {auth, database} from '../../firebase';
import { signOut } from 'firebase/auth';

const deviceHalfWidth = Dimensions.get('window').width / 2 - 20;
const deviceWidth = Dimensions.get('window').width-20;
const textInputWidth = Dimensions.get('window').width - 50; // Calculate TextInput width

const ViewStats = ({user, navigation}) => {
  const {articles} = useContext(AuthenticatedUserContext);
  const [myArticles, setMyArticles] = useState([]);
  const cardWidth = Dimensions.get('window').width - 20;

  useEffect(() => {
    setMyArticles(
      articles.filter(
        article =>
          article.authorName === user.firstName + ' ' + user.secondName,
      ),
    );
  }, [articles]);

  const deleteHandler = (id)=> {
    Alert.alert(
      'Are you sure you want to delete?',
      "Press 'No' to cancel\nPress 'Yes' to delete",
      [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: () => {
            remove(ref(database, 'Articles/' + id)).then(snapshot => {
              console.log('After deletion', snapshot);
              Toast.success('Article deleted successfully', 'top');
            });
          },
        },
      ],
    );
  };

  const editHandler = (article)=>{
    Alert.alert(
      'Are you sure you want to edit this article?',
      "Press 'No' to cancel\nPress 'Yes' to proceed",
      [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: () => {
            navigation.navigate('Create Article',{article : article})
          },
        },
      ],
    );

  }

  return (
    <View>
      <Text style={styles.title}>Your articles ({articles.length})</Text>
      {myArticles.map(article => (
        <Card
        // elevation={3}
        key={article.id}
          style={{
            backgroundColor: '#f9f9f9',
            width: cardWidth,
            marginBottom: 30,
          }}>
          <Card.Title title={article.title} titleVariant="titleMedium" />
          <Card.Actions>
            <Button
              icon="pencil"
              style={{borderColor: primaryColor}}
              textColor={primaryColor}
              onPress={()=>editHandler(article)}
              >
              {' '}
              Edit
            </Button>
            <Button
              buttonColor="tomato"
              icon={'delete'}
              textColor="white"
              onPress={()=>deleteHandler(article.id)
              }>
              Delete
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </View>
  );
};

const EditProfile = ({user, onUpdateProfile}) => {
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [secondName, setSecondName] = useState(user.secondName);
  const [phoneNo, setPhoneNo] = useState(user.phoneNo);

  const updateProfile = () => {
    if (
      firstName === user.firstName &&
      secondName === user.secondName &&
      phoneNo === user.phoneNo &&
      email === user.email
    ) {
      Toast.error('No changes made', 'top');
      return;
    }
    if (
      firstName === '' ||
      secondName === '' ||
      phoneNo === '' ||
      email === ''
    ) {
      Toast.error('All fields are required', 'top');
      return;
    }
    if (!email.includes('@')) {
      Toast.error('Invalid email', 'top');
      return;
    }
    update(ref(database, 'user/' + user.userId), {
      firstName: firstName,
      secondName: secondName,
      phoneNo: phoneNo,
      email: email,
    })
      .then(() => {
        onUpdateProfile({
          ...user,
          firstName: firstName,
          secondName: secondName,
          phoneNo: phoneNo,
          email: email,
        });
        Toast.success('Profile updated successfully', 'top');
      })
      .catch(error => {
        Toast.error('Error updating profile', 'top');
      });
  };

  return (
    <View>
      <Text style={{...styles.userText, marginVertical: 30, fontSize: 25}}>
        Edit Your Profile
      </Text>
      <TextInput
        mode="outlined"
        label="Enter First Name"
        placeholder="eg. John"
        value={firstName}
        style={{
          ...styles.input,
          width: textInputWidth,
          backgroundColor: '#f9f9f9',
        }} // Use custom TextInput width
        onChangeText={text => setFirstName(text)}
      />
      <TextInput
        mode="outlined"
        label="Enter Second Name"
        value={secondName}
        placeholder="eg. Doe"
        style={{
          ...styles.input,
          width: textInputWidth,
          backgroundColor: '#f9f9f9',
        }} // Use custom TextInput width
        onChangeText={text => setSecondName(text)}
      />
      <TextInput
        mode="outlined"
        label="Enter phone number"
        placeholder="eg. 07xxxxxxxx"
        textContentType="telephoneNumber"
        value={phoneNo}
        style={{
          ...styles.input,
          width: textInputWidth,
          backgroundColor: '#f9f9f9',
        }} // Use custom TextInput width
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
        style={{
          ...styles.input,
          width: textInputWidth,
          backgroundColor: '#f9f9f9',
        }} // Use custom TextInput width
      />
      <Button
        mode="contained"
        textColor={'white'}
        style={{
          ...styles.button,
          width: textInputWidth,
          backgroundColor: primaryColor,
        }}
        onPress={updateProfile}>
        Save Changes
      </Button>
    </View>
  );
};

const Profile = ({navigation}) => {
  const {user, setUser} = useContext(AuthenticatedUserContext);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleUpdateProfile = updatedUser => {
    setUser(updatedUser);
    setShowEditProfile(false);
  };
  const logOutHandler = () => {
   signOut(auth).then((snapshot)=>{
    console.log(snapshot)
      Toast.success('Logged out successfully', 'top');
      navigation.replace('Login')
    })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        <UserAvatar
          color={primaryColor}
          name={user.firstName + ' ' + user.secondName}
          size={100}
        />
        <View>
          <Text style={styles.username}>
            {user.firstName + ' ' + user.secondName}
          </Text>
          <Text style={styles.userText}>{user.email}</Text>
          <Text style={styles.userText}>{user.phoneNo}</Text>
        </View>
      </View>
      <Button
          textColor={"white"}
          style={{width:deviceWidth, marginBottom:30}}
          buttonColor='tomato'
          icon={'logout'}
          onPress={logOutHandler}>
        Log Out
        </Button>

      <View style={styles.buttonContainer}>
        <Button
          textColor={!showEditProfile ? 'white' : primaryColor}
          style={!showEditProfile ? styles.buttonAlt : styles.button}
          onPress={() => setShowEditProfile(false)}>
          View Stats
        </Button>
        <Button
          textColor={showEditProfile ? 'white' : primaryColor}
          style={showEditProfile ? styles.buttonAlt : styles.button}
          onPress={() => setShowEditProfile(true)}>
          Edit Profile
        </Button>
      </View>
      {showEditProfile ? (
        <EditProfile user={user} onUpdateProfile={handleUpdateProfile} />
      ) : (
        <ViewStats user={user} navigation={navigation}/>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: 'white',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginStart: 20,
    alignSelf: 'flex-start',
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
    fontWeight: '700',
    color: primaryColorVariant,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#f9f9f9',
    width: deviceHalfWidth,
    marginHorizontal: 10,
    borderColor: primaryColor,
    borderWidth: 1,
  },
  buttonAlt: {
    backgroundColor: primaryColor,
    width: deviceHalfWidth,
    marginHorizontal: 10,
  },
  input: {
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 30,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
