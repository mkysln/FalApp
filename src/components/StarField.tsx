import React, { useEffect, useRef, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants/theme';

interface StarProps {
  x: number;
  y: number;
  delay: number;
  duration: number;
  initialOpacity: number;
}

const Star: React.FC<StarProps> = ({ x, y, delay, duration, initialOpacity }) => {
  const opacity = useSharedValue(initialOpacity);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.15, { duration: duration * 0.5 }),
          withTiming(1, { duration: duration * 0.5 }),
        ),
        -1,
        true,
      ),
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[styles.star, animStyle, { left: x, top: y }]}
    />
  );
};

const StarField: React.FC = () => {
  const stars = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * SCREEN_WIDTH,
      y: Math.random() * SCREEN_HEIGHT,
      delay: Math.random() * 4000,
      duration: (2 + Math.random() * 3) * 1000,
      initialOpacity: Math.random() * 0.5 + 0.1,
    })),
  []);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {stars.map(s => (
        <Star key={s.id} {...s} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  star: {
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
});

export default StarField;