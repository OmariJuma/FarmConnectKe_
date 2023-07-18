import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {ref, set} from 'firebase/database';
import {auth} from '../../firebase';
import {database} from '../../firebase';
import {primaryColor, primaryColorVariant} from '../UI/AppBar';
const backImage = require('../../assets/signup.png');

export default function Signup({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [isText, setIsText] = useState(false);
  const [error, setError] = useState('');
  const onHandleSignup = () => {
    if (
      firstName.trim().length > 2 &&
      secondName.trim().length > 2 &&
      phoneNo.length == 10 &&
      email.trim().length > 6 &&
      email.includes(['@' && '.']) &&
      password.trim().length > 7
    ) {
      if (
        password.trim().toString() == '12345678' ||
        password.trim().toString() == '1234567890'
      ) {
        return setError('Password cannot be ' + password);
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then(credentials => {
          console.log('Signup success');
          updateProfile(credentials.user, {
            displayName: firstName + ' ' + secondName,
            photoURL:
              'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
          });
          set(ref(database, 'Users/' + credentials.user.uid), {
            id: credentials.user.uid,
            email: email,
            firstName: firstName,
            secondName: secondName,
            phoneNo: phoneNo,
          });
        })
        .then(updated => {
          navigation.navigate('Login');
        })
        .catch(err => Alert.alert('Login error', err.message));
    } else if (
      !email.includes(['@' || '.']) ||
      password.trim().length < 7 ||
      firstName.trim().length < 2 ||
      secondName.trim().length < 2 ||
      phoneNo.trim().length < 10
    ) {
      setError(
        'Please enter: \nTip 1: A valid email address and password which is not 12345678 or 1234567890 \nTip 2: First Name and Second Name should not be empty or less than three characters\nTip 3: Phone number should be ten digits e.g 07XXXXXXXX or 011XXXXXXX',
      );
    } else {
      setError(
        'Please fill in all the fields correctly.\nTip 1: make sure your email has an @\nTip 2: The password should be greater than 7 characters',
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Create an Account today</Text>
        <TextInput
          mode="outlined"
          label="Enter First Name"
          placeholder="eg. John"
          style={{marginBottom: 20}}
          onChangeText={text => setFirstName(text)}
        />
        <TextInput
          mode="outlined"
          label="Enter Second Name"
          placeholder="eg. Doe"
          style={{marginBottom: 20}}
          onChangeText={text => setSecondName(text)}
        />
        <TextInput
          mode="outlined"
          label="Enter phone number"
          placeholder="eg. 07xxxxxxxx"
          textContentType="telephoneNumber"
          style={{marginBottom: 20}}
          onChangeText={text => setPhoneNo(text)}
        />
        <TextInput
          mode="outlined"
          // style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          label={'Email'}
          value={email}
          onChangeText={text => setEmail(text)}
          style={{marginBottom: 20}}
        />
        <TextInput
          // style={styles.input}
          mode="outlined"
          placeholder="Enter password"
          label={'Password'}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={isText ? false : true}
          textContentType={isText ? 'name' : 'password'}
          value={password}
          right={
            isText ? (
              <TextInput.Icon
                iconColor={primaryColorVariant}
                icon="eye-off"
                onPress={() => setIsText(!isText)}
              />
            ) : (
              <TextInput.Icon icon="eye" onPress={() => setIsText(!isText)} />
            )
          }
          onChangeText={text => setPassword(text)}
          style={{marginBottom: 20}}
        />
        {error && (
          <Text
            style={{
              backgroundColor: '#ffdcdf',
              textAlign: 'left',
              paddingVertical: 10,
              paddingLeft: 10,
              borderColor: 'red',
              color: 'red',
            }}>
            {error}
          </Text>
        )}

        <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
          <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>
            {' '}
            Sign Up
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>
            Do you have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                color: primaryColorVariant,
                fontWeight: '600',
                fontSize: 14,
                textDecorationLine: 'underline',
              }}>
              {' '}
              Click here to log in
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: primaryColorVariant,
    alignSelf: 'center',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F6F7FB',
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    backgroundColor: '#fff',
  },
  form: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: primaryColor,
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});
