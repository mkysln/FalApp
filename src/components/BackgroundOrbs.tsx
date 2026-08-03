import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../constants/theme';

interface OrbProps {
  size: number;
  colors: [string, string];
  style: object;
  delay?: number;
}

const Orb: React.FC<OrbProps> = ({ size, colors, style, delay = 0 }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    translateX.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(30, { duration: 6000 }),
          withTiming(0, { duration: 6000 }),
        ),
        -1,
        true,
      ),
    );
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(20, { duration: 6000 }),
          withTiming(0, { duration: 6000 }),
        ),
        -1,
        true,
      ),
    );
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1.08, { duration: 6000 }),
          withTiming(1, { duration: 6000 }),
        ),
        -1,
        true,
      ),
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.orb,
        { width: size, height: size, borderRadius: size / 2 },
        style,
        animStyle,
      ]}
    >
      <LinearGradient
        colors={colors}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 1, y: 1 }}
      />
    </Animated.View>
  );
};

const BackgroundOrbs: React.FC = () => (
  <View style={StyleSheet.absoluteFill} pointerEvents="none">
    <Orb
      size={420}
      colors={COLORS.orb1}
      style={styles.orb1}
      delay={0}
    />
    <Orb
      size={320}
      colors={COLORS.orb2}
      style={styles.orb2}
      delay={3000}
    />
    <Orb
      size={260}
      colors={COLORS.orb3}
      style={styles.orb3}
      delay={6000}
    />
  </View>
);

const styles = StyleSheet.create({
  orb: {
    position: 'absolute',
    opacity: 0.35,
  },
  orb1: {
    top: -100,
    left: -100,
  },
  orb2: {
    bottom: '10%',
    right: -80,
  },
  orb3: {
    top: '40%',
    left: '20%',
  },
});

export default BackgroundOrbs;