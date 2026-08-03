import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface CTAButtonProps {
  onPress: () => void;
  label?: string;
  loadingLabel?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  onPress,
  label = '✦ Falıma Bak ✦',
  loadingLabel = '✦ Ruhlar Konuşuyor... ✦',
}) => {
  const [loading, setLoading] = useState(false);
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(shimmerAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [shimmerAnim]);

  const handlePress = () => {
    if (loading) return;
    setLoading(true);
    onPress();
    setTimeout(() => setLoading(false), 2000);
  };

  const shimmerOpacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 0.2],
  });

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.88} style={styles.wrapper}>
      <LinearGradient
        colors={['#7c3aed', '#db2777', '#7c3aed']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        {/* Top shine */}
        <Animated.View style={[styles.shine, { opacity: shimmerOpacity }]} />
        <View style={styles.content}>
          <Text style={styles.label}>{loading ? loadingLabel : label}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 50,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  gradient: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255,255,255,1)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  content: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});

export default CTAButton;