# Nazar — Yapay Zeka Fal Uygulaması

Liquid Glass estetiğiyle tasarlanmış, React Native CLI tabanlı fal uygulaması.

## Kurulum

### 1. Bağımlılıkları yükle

```bash
npm install
# veya
yarn install
```

### 2. iOS pod'ları kur

```bash
cd ios && pod install && cd ..
```

### 3. Android için (opsiyonel)
`android/app/build.gradle` dosyasına herhangi bir ek ayar gerekmez.

---

## Kullanılan Paketler

| Paket | Amaç |
|---|---|
| `@react-native-community/blur` | Liquid glass / cam efekti |
| `react-native-linear-gradient` | Gradient arka planlar, butonlar |
| `react-native-reanimated` | Performanslı animasyonlar |
| `react-native-safe-area-context` | Notch / island güvenli alan |
| `react-native-image-picker` | Fal fotoğrafı yükleme |

---

## Özel Fontlar (Opsiyonel)

`Cormorant Garamond` fontunu eklemek için:

1. Font dosyalarını `src/assets/fonts/` klasörüne koy.
2. `react-native.config.js` dosyası oluştur:

```js
module.exports = {
  assets: ['./src/assets/fonts/'],
};
```

3. Fontları bağla:

```bash
npx react-native-asset
```

4. `HomeScreen.tsx` ve diğer bileşenlerde `fontFamily: 'Georgia'` yerine
   `fontFamily: 'CormorantGaramond-Light'` kullan.

---

## Proje Yapısı

```
NazarApp/
├── App.tsx                          # Giriş noktası
├── src/
│   ├── constants/
│   │   └── theme.ts                 # Renkler, fal türleri, sabit veriler
│   ├── components/
│   │   ├── BackgroundOrbs.tsx       # Hareketli gradient orb'lar
│   │   ├── StarField.tsx            # Titreşen yıldız arka planı
│   │   ├── CrystalBall.tsx          # Kristal küre animasyonu
│   │   ├── FalTypeChip.tsx          # Fal türü seçim chip'i
│   │   ├── HistoryItem.tsx          # Geçmiş fal kartı
│   │   ├── CTAButton.tsx            # Ana gradient butonu
│   │   └── BottomNav.tsx            # Alt navigasyon çubuğu
│   └── screens/
│       └── HomeScreen.tsx           # Ana ekran
```

---

## AI Entegrasyonu

`HomeScreen.tsx` içindeki `handleFalBak` fonksiyonunu Anthropic API ile bağla:

```ts
const handleFalBak = async () => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'YOUR_API_KEY',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Sen deneyimli bir ${activeFal} falcısısın. 
          Soru: ${question}
          Lütfen detaylı ve mistik bir yorum yap.`,
        },
      ],
    }),
  });
  const data = await response.json();
  // Sonuç ekranına yönlendir
};
```