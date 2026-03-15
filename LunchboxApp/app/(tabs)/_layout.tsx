import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const TABS = [
  { name: 'index',    label: 'HOME',     icon: 'home'     as const },
  { name: 'chef',     label: 'CHEF',     icon: 'award'    as const },
  { name: 'calendar', label: 'CALENDAR', icon: 'calendar' as const },
  { name: 'profile',  label: 'PROFILE',  icon: 'user'     as const },
];

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.pill}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const tab = TABS[index];
          return (
            <TouchableOpacity
              key={route.key}
              style={[styles.tabItem, focused && styles.tabItemActive]}
              onPress={() => navigation.navigate(route.name)}
              activeOpacity={1}
            >
              <Feather
                name={tab.icon}
                size={18}
                color={focused ? '#FFFFFF' : '#A1A1AA'}
              />
              <Text style={[styles.label, focused && styles.labelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="chef" />
      <Tabs.Screen name="calendar" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  // 對應 .pen 的 tabBar2：padding [0, 21, 21, 21]
  container: {
    paddingHorizontal: 21,
    paddingBottom: 21,
    backgroundColor: 'transparent',
  },
  // 對應 .pen 的 Pill：height 62, padding 4, borderRadius 100
  pill: {
    flexDirection: 'row',
    height: 62,
    padding: 4,
    borderRadius: 100,
    backgroundColor: '#F7F7F8',
    borderWidth: 1.5,
    borderColor: '#E4E4E7',
  },
  // 對應 .pen 的各 Tab：flex 1 (fill_container), borderRadius 26, 垂直居中
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderRadius: 26,
  },
  // 對應 active tab：fill #3F3F46
  tabItemActive: {
    backgroundColor: '#3F3F46',
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.5,
    color: '#A1A1AA',
  },
  labelActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
