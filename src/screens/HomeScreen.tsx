import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackgroundOrbs from '../components/BackgroundOrbs';
import StarField from '../components/StarField';
import CrystalBall from '../components/CrystalBall';
import FalTypeChip from '../components/FalTypeChip';
import HistoryItem from '../components/HistoryItem';
import CTAButton from '../components/CTAButton';
import BottomNav from '../components/BottomNav';
import { COLORS, FAL_TYPES, HISTORY_ITEMS } from '../constants/theme';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [activeFal, setActiveFal] = useState<string>('coffee');
  const [activeNav, setActiveNav] = useState<string>('home');
  const [question, setQuestion] = useState('');

  const currentFal = FAL_TYPES.find(f => f.id === activeFal);

  const handleCrystalPress = () => {
    Alert.alert('Fotoğraf Yükle', 'Kahve fincanınızın fotoğrafını çekin veya seçin.', [
      { text: 'Kamera', onPress: () => {} },
      { text: 'Galeri', onPress: () => {} },
      { text: 'İptal', style: 'cancel' },
    ]);
  };

  const handleFalBak = () => {
    if (!question.trim()) {
      Alert.alert('Sorunuzu Yazın', 'Lütfen bir soru girin.');
      return;
    }
    // Navigate to result screen or call AI API
    console.log('Fal bak:', { fal: activeFal, question });
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Arka plan efektleri */}
      <BackgroundOrbs />
      <StarField />

      {/* Blur SADECE görsel arka plan katmanı - layout'a katılmıyor */}
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="dark"
        blurAmount={40}
        reducedTransparencyFallbackColor="rgba(10,6,18,0.85)"
      />

      {/* Gerçek içerik - ayrı, normal flex container içinde */}
      <View style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.moonIcon}>🌙</Text>
          <Text style={styles.appTitle}>Nazar</Text>
          <Text style={styles.appSubtitle}>Yapay Zeka Falcısı</Text>
        </View>

        <ScrollView
          contentContainerStyle={[
            styles.scroll,
            { paddingBottom: insets.bottom + 16 },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Fal türleri */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipRow}
          >
            {FAL_TYPES.map(fal => (
              <FalTypeChip
                key={fal.id}
                label={fal.label}
                active={activeFal === fal.id}
                onPress={() => setActiveFal(fal.id)}
              />
            ))}
          </ScrollView>

          {/* Kristal küre */}
          <View style={styles.crystalSection}>
            <CrystalBall
              emoji={currentFal?.emoji ?? '🔮'}
              onPress={handleCrystalPress}
            />
          </View>

          {/* Soru kutusu */}
          <View style={styles.questionCard}>
            <Text style={styles.questionLabel}>✦ Sorunuz</Text>
            <TextInput
              style={styles.questionInput}
              placeholder="Aşkım, kariyerim, geleceğim hakkında ne görmek istersiniz?"
              placeholderTextColor={COLORS.textPlaceholder}
              multiline
              value={question}
              onChangeText={setQuestion}
              textAlignVertical="top"
            />
          </View>

          {/* CTA */}
          <CTAButton onPress={handleFalBak} />

          {/* Geçmiş */}
          <Text style={styles.sectionTitle}>Son Fallarınız</Text>

          {HISTORY_ITEMS.map(item => (
            <HistoryItem
              key={item.id}
              type={item.type}
              typeLabel={item.typeLabel}
              question={item.question}
              time={item.time}
              emoji={item.emoji}
              onPress={() => console.log('History item pressed:', item.id)}
            />
          ))}
        </ScrollView>

        {/* Alt navigasyon */}
        <BottomNav activeId={activeNav} onPress={setActiveNav} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bgDeep,
  },
  contentContainer: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },

  // Header
  header: {
    alignItems: 'center',
    paddingVertical: 0,
    paddingBottom: 24,
  },
  moonIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  appTitle: {
    fontFamily: 'Georgia', // swap for Cormorant Garamond if you add custom fonts
    fontSize: 32,
    fontWeight: '300',
    letterSpacing: 6,
    textTransform: 'uppercase',
    color: COLORS.textTitle,
  },
  appSubtitle: {
    fontSize: 12,
    letterSpacing: 3,
    color: 'rgba(167,139,250,0.6)',
    textTransform: 'uppercase',
    marginTop: 4,
  },

  // Chips
  chipRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 4,
    marginBottom: 4,
  },

  // Crystal
  crystalSection: {
    alignItems: 'center',
    marginVertical: 8,
    marginBottom: 16,
  },

  // Question
  questionCard: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderFaint,
    borderRadius: 24,
    padding: 16,
    marginVertical: 12,
  },
  questionLabel: {
    fontSize: 11,
    letterSpacing: 2,
    color: COLORS.textAccent,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  questionInput: {
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.85)',
    fontFamily: 'Georgia',
    fontSize: 17,
    fontStyle: 'italic',
    lineHeight: 26,
    minHeight: 52,
  },

  // History
  sectionTitle: {
    fontSize: 11,
    letterSpacing: 2,
    color: COLORS.textFaint,
    textTransform: 'uppercase',
    marginTop: 20,
    marginBottom: 12,
  },

  // Home indicator
  homeIndicator: {
    width: 120,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
  },
});

export default HomeScreen;