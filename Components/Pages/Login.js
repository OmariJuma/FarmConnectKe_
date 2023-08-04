import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase';
import {AuthenticatedUserContext} from '../../Store/Provider';
import {primaryColor, primaryColorVariant} from '../UI/AppBar';
import {onValue, ref} from 'firebase/database';
import {database} from '../../firebase';
import {Toast} from 'toastify-react-native';

const backImage = require('../../assets/login.png');

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isText, setIsText] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const showErrorToast = () =>
    Toast.error('Please enter a valid email address and password', 'top');
  const showSuccessToast = () => Toast.success('Login successful', 'top');

  const {user, setUser} = useContext(AuthenticatedUserContext);
  const onHandleLogin = async () => {
    setIsLoading(true);
    if (
      email.trim().length > 6 &&
      email.includes(['@' && '.']) &&
      password.trim().length > 7
    ) {
      await signInWithEmailAndPassword(auth, email, password)
        .then(res => {
          showSuccessToast();
          setIsLoading(false);
          setError('');
          setUser({
            userId: res._tokenResponse.localId,
            email: res._tokenResponse.email,
            photoURL: res._tokenResponse.photoUrl,
          });
          onValue(
            ref(database, 'Users/' + res._tokenResponse.localId),
            snapshot => {
              if (snapshot.val()) {
                setUser(prev => ({
                  ...prev,
                  firstName: snapshot.val().firstName,
                  secondName: snapshot.val().secondName,
                  phoneNo: snapshot.val().phoneNo,
                }));
              }
            },
          );
          navigation.replace("Tabs");
        })
        .catch(err => Toast.error('error message: ' + err.message, 'top'));
    } else if (!email.includes(['@' || '.'])) {
      setIsLoading(false);
      setError('Please enter a valid email address and password');
      Toast.error('Provide a valid email address and password', 'top', {
        height: 300,
      });
    } else {
      setIsLoading(false);
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
        <Text style={styles.title}>Log In To Continue</Text>
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

        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          {!isLoading&& <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>
            Log In
          </Text>}
          {isLoading && <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="white" />
            <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>
              Logging In...
            </Text>
          </View>}
        </TouchableOpacity>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.push('Signup')}>
            <Text
              style={{
                color: primaryColorVariant,
                fontWeight: '600',
                fontSize: 14,
                textDecorationLine: 'underline',
              }}>
              {' '}
              Click here to Sign Up
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
    paddingBottom: 24,
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
    width: 200,
    height: 200,
    alignSelf: 'center',
    borderRadius: 100,
    // position: 'absolute',
    marginTop: 20,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    // height: '80%',
    // position: 'absolute',
    // bottom: 0,
    backgroundColor: '#f9f9f9',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  form: {
    flex: 1,
    // justifyContent: 'center',
    // marginTop:100,
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
