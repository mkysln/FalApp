import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../constants/theme';

type HistoryType = 'coffee' | 'tarot' | 'star';

interface HistoryItemProps {
  type: HistoryType;
  typeLabel: string;
  question: string;
  time: string;
  emoji: string;
  onPress?: () => void;
}

const ICON_CONFIG: Record<HistoryType, { colors: [string, string]; border: string }> = {
  coffee: { colors: COLORS.iconCoffee, border: COLORS.borderCoffee },
  tarot:  { colors: COLORS.iconTarot,  border: COLORS.borderTarot },
  star:   { colors: COLORS.iconStar,   border: COLORS.borderStar },
};

const HistoryItem: React.FC<HistoryItemProps> = ({
  type, typeLabel, question, time, emoji, onPress,
}) => {
  const config = ICON_CONFIG[type];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {/* Icon */}
      <LinearGradient
        colors={config.colors}
        style={[styles.icon, { borderColor: config.border }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.emoji}>{emoji}</Text>
      </LinearGradient>

      {/* Text */}
      <View style={styles.textWrap}>
        <Text style={styles.typeLabel}>{typeLabel}</Text>
        <Text style={styles.question} numberOfLines={1}>{question}</Text>
      </View>

      {/* Time */}
      <Text style={styles.time}>{time}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    paddingHorizontal: 16,
    backgroundColor: COLORS.bgHistory,
    borderWidth: 1,
    borderColor: COLORS.borderVeryFaint,
    borderRadius: 18,
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  emoji: {
    fontSize: 18,
  },
  textWrap: {
    flex: 1,
    minWidth: 0,
  },
  typeLabel: {
    fontSize: 12,
    color: COLORS.textAccent,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  question: {
    fontFamily: 'Georgia',
    fontSize: 15,
    color: 'rgba(255,255,255,0.75)',
  },
  time: {
    fontSize: 11,
    color: COLORS.textFaint,
    flexShrink: 0,
  },
});

export default HistoryItem;