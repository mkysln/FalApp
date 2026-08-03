import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, NAV_ITEMS } from '../constants/theme';

interface BottomNavProps {
  activeId: string;
  onPress: (id: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeId, onPress }) => (
  <View style={styles.container}>
    {NAV_ITEMS.map(item => {
      const isActive = item.id === activeId;
      return (
        <TouchableOpacity
          key={item.id}
          style={[styles.item, isActive && styles.itemActive]}
          onPress={() => onPress(item.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.icon}>{item.emoji}</Text>
          <Text style={[styles.label, isActive && styles.labelActive]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 8,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderVeryFaint,
  },
  item: {
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  itemActive: {
    backgroundColor: 'rgba(124,58,237,0.2)',
    borderColor: 'rgba(124,58,237,0.3)',
  },
  icon: {
    fontSize: 20,
  },
  label: {
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: COLORS.textFaint,
  },
  labelActive: {
    color: 'rgba(167,139,250,0.9)',
  },
});

export default BottomNav;