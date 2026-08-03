import React, { useEffect, useState } from 'react';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from './src/screens/OnboardScreen';
import HomeScreen from './src/screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const App = () => {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      const hasOnboarded = await AsyncStorage.getItem('hasOnboarded');
      setShowOnboarding(hasOnboarded !== 'true');
      setLoading(false);
    };
    checkOnboarding();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#f63049" />;

  return (
    <SafeAreaProvider>
       <SafeAreaView style={{ flex: 1 }}>
      {showOnboarding ? (
        <OnboardingScreen
          onDone={async () => {
            await AsyncStorage.setItem('hasOnboarded', 'true');
            setShowOnboarding(false);
          }}
        />
      ) : (
        <HomeScreen />
      )}
    </SafeAreaView>
    </SafeAreaProvider>
   
  );
};

export default App;