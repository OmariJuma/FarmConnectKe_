import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  // TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase';
import {primaryColor, primaryColorVariant} from '../UI/AppBar';
const backImage = require('../../assets/signup.png');

export default function Signup({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [isText, setIsText] = useState(false);

  const onHandleSignup = () => {
    console.log(email, password, firstName, secondName, phoneNo);
    if (email !== '' && password !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log('Signup success'))
        .catch(err => Alert.alert('Login error', err.message));
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
              <TextInput.Icon iconColor={primaryColorVariant} icon="eye-off" onPress={()=>setIsText(!isText)} />
            ) : (
              <TextInput.Icon icon="eye" onPress={()=>setIsText(!isText)} />
            )
          }
          onChangeText={text => setPassword(text)}
          style={{marginBottom: 20}}
        />
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
