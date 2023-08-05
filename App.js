import 'react-native-gesture-handler';
import React, {useContext, useEffect, useState} from 'react';
import {PaperProvider} from 'react-native-paper';
import {Image, Dimensions, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import ToastManager from 'toastify-react-native';
import {
  AuthenticatedUserProvider,
} from './Store/Provider';
import Logo from './assets/farmConnect.png';
import { ChatStack } from './Components/Utility/MyStacks';
const deviceWidth = Dimensions.get('window').width;


export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading && (
        <Image
          source={Logo}
          style={{display: 'flex', alignSelf: 'center', marginVertical: '50%'}}
        />
      )}
      {!isLoading && (
        <PaperProvider>
          <AuthenticatedUserProvider>
          <NavigationContainer>
            <ToastManager height={100} width={deviceWidth - 30} />
            <SafeAreaView style={styles.container}>
              <ChatStack/>
            </SafeAreaView>
          </NavigationContainer>
          </AuthenticatedUserProvider>
        </PaperProvider>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
