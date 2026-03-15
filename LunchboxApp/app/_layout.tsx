import { Stack } from 'expo-router';
import { Platform, View, StyleSheet, useWindowDimensions } from 'react-native';

const PHONE_WIDTH = 390;

function AppStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#F7F7F8' },
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

function WebLayout() {
  const { width } = useWindowDimensions();
  const frameWidth = Math.min(width, PHONE_WIDTH);
  const showFrame = width > PHONE_WIDTH;

  return (
    <View style={[styles.webOuter, showFrame && styles.webOuterFrame]}>
      <View style={[styles.phoneContainer, { width: frameWidth }]}>
        <AppStack />
      </View>
    </View>
  );
}

export default function RootLayout() {
  if (Platform.OS === 'web') {
    return <WebLayout />;
  }
  return <AppStack />;
}

const styles = StyleSheet.create({
  // 網頁外層：預設與 app 同色，有框時改為灰色背景
  webOuter: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F7F7F8',
  },
  webOuterFrame: {
    backgroundColor: '#D1D5DB',
  },
  // 手機框：限制寬度、裁切溢出內容
  phoneContainer: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#F7F7F8',
  },
});
