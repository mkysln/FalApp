import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../constants/theme';

interface FalTypeChipProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

const FalTypeChip: React.FC<FalTypeChipProps> = ({ label, active, onPress }) => {
  if (active) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <LinearGradient
          colors={['rgba(124,58,237,0.4)', 'rgba(219,39,119,0.3)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.chip, styles.chipActive]}
        >
          <Text style={[styles.label, styles.labelActive]}>{label}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.chip, styles.chipInactive]}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 50,
    borderWidth: 1,
  },
  chipInactive: {
    backgroundColor: COLORS.bgCard,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  chipActive: {
    borderColor: COLORS.borderAccent,
    shadowColor: COLORS.purple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.5,
    color: COLORS.textMuted,
  },
  labelActive: {
    color: COLORS.textTitle,
  },
});

export default FalTypeChip;