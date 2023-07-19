import * as React from 'react';
import CarouselCards from '../UI/CarouselCards';
import TabbedLayout from '../UI/TabbedLayout';
import {ScrollView} from 'react-native';
import AppBar from '../UI/AppBar';

const Home = ({navigation}) => {
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <AppBar />
      <CarouselCards navigation={navigation} />
      <TabbedLayout navigation={navigation} />
    </ScrollView>
  );
};

export default Home;
