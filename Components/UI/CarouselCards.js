import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CarouselCardItem, {SLIDER_WIDTH, ITEM_WIDTH} from './CarouselCardItem';
import data from './data';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
const CarouselCards = () => {
  const isCarousel = React.useRef(null);
  const [index, setIndex] = React.useState(0);

  return (
    <View>
      <Carousel
        layout="default"
        autoplay
        loop
        autoplayInterval={5000}
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH / 1.5}
        enableSnap={true}
        inactiveSlideShift={10}
        useScrollView={true}
        onSnapToItem={index => setIndex(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          // marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.92)',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
      <TouchableOpacity style={{marginBottom: '5%'}}>
        <Button
          buttonColor="#62D629"
          style={{
            width: '50%',
            marginStart: '25%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={{color:"white"}}>See more agents  </Text>
          <Icon size={17} color="white" name="arrow-right" />
        </Button>
      </TouchableOpacity>
    </View>
  );
};

export default CarouselCards;
