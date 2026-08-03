import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../constants/theme';

interface CrystalBallProps {
  emoji: string;
  onPress: () => void;
}

const BALL_SIZE = 160;

const CrystalBall: React.FC<CrystalBallProps> = ({ emoji, onPress }) => {
  const glow = useSharedValue(0);
  const ringOuter = useSharedValue(0);
  const ringInner = useSharedValue(0);
  const sparkle1 = useSharedValue(0);
  const sparkle2 = useSharedValue(0);
  const sparkle3 = useSharedValue(0);

  useEffect(() => {
    // Glow pulse
    glow.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000 }),
        withTiming(0, { duration: 2000 }),
      ),
      -1,
      true,
    );

    // Ring rotations — simulated via scale+opacity trick
    ringOuter.value = withRepeat(withTiming(1, { duration: 20000 }), -1, false);
    ringInner.value = withRepeat(withTiming(1, { duration: 12000 }), -1, false);

    // Sparkles
    const makeSparkle = (sv: Animated.SharedValue<number>, delay: number) => {
      sv.value = withRepeat(
        withSequence(
          withTiming(0, { duration: delay }),
          withTiming(1, { duration: 1500 }),
          withTiming(0, { duration: 1500 }),
        ),
        -1,
        false,
      );
    };
    makeSparkle(sparkle1, 0);
    makeSparkle(sparkle2, 1000);
    makeSparkle(sparkle3, 2000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const glowStyle = useAnimatedStyle(() => ({
    shadowOpacity: interpolate(glow.value, [0, 1], [0.4, 0.8], Extrapolation.CLAMP),
    shadowRadius: interpolate(glow.value, [0, 1], [20, 40], Extrapolation.CLAMP),
  }));

  const ringOuterStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${ringOuter.value * 360}deg` }],
  }));

  const ringInnerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${-ringInner.value * 360}deg` }],
  }));

  const makeSparkleStyle = (sv: Animated.SharedValue<number>, yOffset: number) =>
    useAnimatedStyle(() => ({  // eslint-disable-line react-hooks/rules-of-hooks
      opacity: sv.value * 0.6 + 0.4,
      transform: [
        { translateY: interpolate(sv.value, [0, 1], [0, yOffset], Extrapolation.CLAMP) },
        { scale: interpolate(sv.value, [0, 1], [1, 1.2], Extrapolation.CLAMP) },
      ],
    }));

  const s1Style = makeSparkleStyle(sparkle1, -6);
  const s2Style = makeSparkleStyle(sparkle2, -6);
  const s3Style = makeSparkleStyle(sparkle3, -6);

  return (
    <View style={styles.container}>
      {/* Outer ring */}
      <Animated.View style={[styles.ringOuter, ringOuterStyle]} />
      {/* Inner ring */}
      <Animated.View style={[styles.ringInner, ringInnerStyle]} />

      {/* Sparkles */}
      <Animated.Text style={[styles.sparkle, styles.sparkle1, s1Style]}>✦</Animated.Text>
      <Animated.Text style={[styles.sparkle, styles.sparkle2, s2Style]}>✧</Animated.Text>
      <Animated.Text style={[styles.sparkle, styles.sparkle3, s3Style]}>⋆</Animated.Text>

      {/* Ball */}
      <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
        <Animated.View style={[styles.ballWrapper, glowStyle]}>
          <LinearGradient
            colors={[
              'rgba(255,255,255,0.25)',
              'rgba(167,139,250,0.15)',
              'rgba(124,58,237,0.1)',
              'rgba(10,6,18,0.3)',
            ]}
            start={{ x: 0.35, y: 0.3 }}
            end={{ x: 1, y: 1 }}
            style={styles.ball}
          >
            {/* Shimmer */}
            <View style={styles.shimmer} />

            <View style={styles.inner}>
              <Text style={styles.emoji}>{emoji}</Text>
              <Text style={styles.label}>Fotoğraf Yükle</Text>
            </View>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: BALL_SIZE + 40,
    height: BALL_SIZE + 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringOuter: {
    position: 'absolute',
    width: BALL_SIZE + 24,
    height: BALL_SIZE + 24,
    borderRadius: (BALL_SIZE + 24) / 2,
    borderWidth: 1,
    borderColor: 'rgba(167,139,250,0.2)',
  },
  ringInner: {
    position: 'absolute',
    width: BALL_SIZE + 12,
    height: BALL_SIZE + 12,
    borderRadius: (BALL_SIZE + 12) / 2,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(219,39,119,0.2)',
  },
  sparkle: {
    position: 'absolute',
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  sparkle1: { top: 8, right: 24 },
  sparkle2: { bottom: 12, left: 18 },
  sparkle3: { top: '50%', right: 4 },
  ballWrapper: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    shadowColor: COLORS.purple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 20,
  },
  ball: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shimmer: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    top: '22%',
    left: '22%',
  },
  inner: {
    alignItems: 'center',
    gap: 4,
  },
  emoji: {
    fontSize: 32,
    opacity: 0.8,
  },
  label: {
    fontFamily: 'Georgia', // Cormorant Garamond yerine built-in serif
    fontSize: 11,
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default CrystalBall;