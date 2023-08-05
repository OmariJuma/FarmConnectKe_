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
import {TextInput, RadioButton} from 'react-native-paper';
import { ActivityIndicator } from 'react-native';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {ref, set} from 'firebase/database';
import { auth } from '../../../firebase';
import {database} from '../../../firebase';
import {primaryColor, primaryColorVariant} from '../../UI/AppBar';
import {Toast } from "toastify-react-native"
import sendEmail from '../../Utility/SendEmail';
const backImage = require('../../../assets/signup.png');


const AddUser = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [error, setError] = useState('');
    const [value, setValue] = useState('Customer Care');
    const [isLoading, setIsLoading] = useState(false);
  
    const onHandleSignup = () => {
      setIsLoading(true);
      if (
        firstName.trim().length > 2 &&
        secondName.trim().length > 2 &&
        phoneNo.length == 10 &&
        email.trim().length > 6 &&
        email.includes(['@' && '.'])
      ) {
        const password = email.slice(0, 4) + phoneNo.slice(0, 4)
        console.log("The password is ", password);
        sendEmail(email,firstName,password);
        createUserWithEmailAndPassword(auth, email, password)
          .then(credentials => {
            setIsLoading(false);
            Toast.success('Signup success',"top");
            updateProfile(credentials.user, {
              displayName: firstName + ' ' + secondName,
            });
            set(ref(database, 'Users/' + credentials.user.uid), {
              id: credentials.user.uid,
              email: email,
              firstName: firstName,
              secondName: secondName,
              phoneNo: phoneNo,
              userRole:value
            }).then(()=>{
                setEmail("");
                setFirstName("");
                setSecondName("");
                setPhoneNo("");
                setValue("User")
            })
          }) .catch(err =>{
            setIsLoading(false);
            return Alert.alert('Login error', err.message)})
      } else if (
        !email.includes(['@' || '.']) ||
        firstName.trim().length < 2 ||
        secondName.trim().length < 2 ||
        phoneNo.trim().length < 10
      ) {
        setIsLoading(false);
        setError(
          'Please enter: \nTip 1: A valid email address \nTip 2: First Name and Second Name should not be empty or less than three characters\nTip 3: Phone number should be ten digits e.g 07XXXXXXXX or 011XXXXXXX',
        );
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
          <Text style={styles.title}>Create Account </Text>
          <TextInput
            mode="outlined"
            label="Enter First Name"
            placeholder="eg. John"
            value={firstName}
            style={{marginBottom: 20}}
            onChangeText={text => setFirstName(text)}
          />
          <TextInput
            mode="outlined"
            label="Enter Second Name"
            placeholder="eg. Doe"
            value={secondName}
            style={{marginBottom: 20}}
            onChangeText={text => setSecondName(text)}
          />
          <TextInput
            mode="outlined"
            label="Enter phone number"
            placeholder="eg. 07xxxxxxxx"
            textContentType="telephoneNumber"
            value={phoneNo}
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
          <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
          <Text>Select User Role</Text>
                <RadioButton.Item label="Customer Care Agent" value="Customer Care" />
                <RadioButton.Item label='Normal User' value="User" />
        </RadioButton.Group>
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
            {!isLoading&&<Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>
              {' '}
              Sign Up
            </Text>}
            {isLoading && <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ActivityIndicator size="large" color="white" />
              <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>
                Creating Account...
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
          </View>
        </SafeAreaView>
        <StatusBar barStyle="light-content" />
      </ScrollView>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      marginTop:20,
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
   
export default AddUser;