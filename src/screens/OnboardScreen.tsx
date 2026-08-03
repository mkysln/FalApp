import React from 'react';
import { View, Text, Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const slides = [
  {
    backgroundColor: '#f63049',
    image: <Image source={{uri:'https://picsum.photos/400/400?random=1'}} />,
    title: 'Welcome',
    subtitle: 'Learn how to use the app',
  },
  {
    backgroundColor: '#d02752',
    image: <Image source={{uri:'https://picsum.photos/400/400?random=1'}} />,
    title: 'Track Activities',
    subtitle: 'Monitor your daily productivity',
  },
  {
    backgroundColor: '#8a244b',
    image: <Image source={{uri:'https://picsum.photos/400/400?random=1'}} />,
    title: 'AI Reports',
    subtitle: 'Get weekly analysis automatically',
  },
];

const OnboardingScreen = ({ onDone }: { onDone: () => void }) => {
  return (
    <Onboarding
      pages={slides}
      onDone={onDone}        // tüm sayfalar tamamlanınca
      onSkip={onDone}        // skip butonuna basınca
      showSkip={true}        // skip butonu görünür
      bottomBarHighlight={false} // alt bar rengini sabitle
    />
  );
};

export default OnboardingScreen;