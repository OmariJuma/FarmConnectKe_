import * as React from 'react';
import CarouselCards from '../UI/CarouselCards';
import TabbedLayout from '../UI/TabbedLayout';
import {ScrollView} from 'react-native';

const Home = ({navigation}) => {
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <CarouselCards />
      <TabbedLayout navigation={navigation} />
    </ScrollView>
  );
};

export default Home;
