import { Dimensions } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const COLORS = {
  // Backgrounds
  bgDeep: '#0a0612',
  bgCard: 'rgba(255,255,255,0.04)',
  bgCardHover: 'rgba(167,139,250,0.08)',
  bgHistory: 'rgba(255,255,255,0.03)',

  // Brand
  purple: '#7c3aed',
  purpleLight: '#a78bfa',
  purpleFaint: 'rgba(124,58,237,0.3)',
  pink: '#db2777',
  pinkFaint: 'rgba(219,39,119,0.3)',
  blue: '#1d4ed8',

  // Text
  textPrimary: '#f0e8ff',
  textTitle: '#e9d5ff',
  textMuted: 'rgba(255,255,255,0.6)',
  textFaint: 'rgba(255,255,255,0.3)',
  textAccent: 'rgba(167,139,250,0.7)',
  textPlaceholder: 'rgba(255,255,255,0.2)',

  // Borders
  borderFaint: 'rgba(255,255,255,0.08)',
  borderVeryFaint: 'rgba(255,255,255,0.06)',
  borderAccent: 'rgba(167,139,250,0.5)',
  borderCoffee: 'rgba(180,83,9,0.3)',
  borderTarot: 'rgba(124,58,237,0.3)',
  borderStar: 'rgba(29,78,216,0.3)',

  // Chip icon backgrounds
  iconCoffee: ['rgba(120,53,15,0.4)', 'rgba(180,83,9,0.3)'] as [string, string],
  iconTarot: ['rgba(124,58,237,0.3)', 'rgba(219,39,119,0.2)'] as [string, string],
  iconStar: ['rgba(29,78,216,0.3)', 'rgba(124,58,237,0.2)'] as [string, string],

  // CTA gradient
  ctaGradient: ['#7c3aed', '#db2777', '#7c3aed'] as [string, string, string],

  // Orb backgrounds
  orb1: ['#7c3aed', 'transparent'] as [string, string],
  orb2: ['#db2777', 'transparent'] as [string, string],
  orb3: ['#1d4ed8', 'transparent'] as [string, string],
} as const;

export const FAL_TYPES = [
  { id: 'coffee', label: '✦ Kahve Falı', emoji: '☕' },
  { id: 'tarot',  label: '🃏 Tarot',      emoji: '🃏' },
  { id: 'star',   label: '⭐ Yıldız Falı', emoji: '⭐' },
  { id: 'crystal',label: '🔮 Kristal',    emoji: '🔮' },
  { id: 'palm',   label: '🖐 El Falı',    emoji: '🖐' },
] as const;

export const HISTORY_ITEMS = [
  {
    id: '1',
    type: 'coffee' as const,
    typeLabel: 'Kahve Falı',
    question: 'Aşk hayatım hakkında ne görüyorsun?',
    time: '2s önce',
    emoji: '☕',
  },
  {
    id: '2',
    type: 'tarot' as const,
    typeLabel: 'Tarot',
    question: 'Yeni işim başarılı olacak mı?',
    time: '1g önce',
    emoji: '🃏',
  },
  {
    id: '3',
    type: 'star' as const,
    typeLabel: 'Yıldız Falı',
    question: 'Bu ay şansım nasıl olacak?',
    time: '3g önce',
    emoji: '⭐',
  },
] as const;

export const NAV_ITEMS = [
  { id: 'home',    label: 'Fal',     emoji: '🔮' },
  { id: 'history', label: 'Geçmiş',  emoji: '📖' },
  { id: 'zodiac',  label: 'Burçlar', emoji: '✨' },
  { id: 'profile', label: 'Profil',  emoji: '👤' },
] as const;