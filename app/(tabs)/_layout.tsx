
import { Tabs } from 'expo-router';
import { colors } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import { useTranslation } from '../../hooks/useTranslation';

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('dailyProgram'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: t('tasks'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="checkmark-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="resolution"
        options={{
          title: t('resolution'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="bulb-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="objectives"
        options={{
          title: t('objectives'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="target-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: t('results'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="trophy-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
