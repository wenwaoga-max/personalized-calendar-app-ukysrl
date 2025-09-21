
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../../styles/commonStyles';
import { useCalendarData } from '../../hooks/useCalendarData';
import { useTranslation } from '../../hooks/useTranslation';
import Icon from '../../components/Icon';

export default function DailyProgramScreen() {
  const { dailyProgram, toggleProgramItem, getStats } = useCalendarData();
  const { t, formatDate } = useTranslation();
  const stats = getStats();

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const displayHour = hour.toString().padStart(2, '0');
    return `${displayHour}:${minutes}`;
  };

  const getCurrentDate = () => {
    const today = new Date();
    return formatDate(today);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.section}>
          <Text style={commonStyles.title}>{t('dailyProgram')}</Text>
          <Text style={commonStyles.textSecondary}>{getCurrentDate()}</Text>
        </View>

        {/* Progress Overview */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <View style={commonStyles.row}>
            <View style={{ flex: 1 }}>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                {t('todaysProgress')}
              </Text>
              <Text style={commonStyles.textSecondary}>
                {stats.programCompleted} {t('of')} {stats.totalProgram} {t('completed')}
              </Text>
            </View>
            <View style={commonStyles.centerContent}>
              <Text style={[commonStyles.title, { color: colors.primary, fontSize: 24 }]}>
                {Math.round(stats.programCompletionRate)}%
              </Text>
            </View>
          </View>
        </View>

        {/* Daily Program Items */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>{t('schedule')}</Text>
          {dailyProgram.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                commonStyles.card,
                {
                  backgroundColor: item.completed ? colors.backgroundAlt : colors.card,
                  borderLeftWidth: 4,
                  borderLeftColor: item.completed ? colors.success : colors.primary,
                }
              ]}
              onPress={() => toggleProgramItem(item.id)}
            >
              <View style={commonStyles.row}>
                <View style={{ flex: 1 }}>
                  <View style={[commonStyles.row, { marginBottom: 8 }]}>
                    <Text style={[
                      commonStyles.text,
                      {
                        fontWeight: '600',
                        textDecorationLine: item.completed ? 'line-through' : 'none',
                        color: item.completed ? colors.textSecondary : colors.text,
                      }
                    ]}>
                      {formatTime(item.time)}
                    </Text>
                  </View>
                  <Text style={[
                    commonStyles.text,
                    {
                      fontWeight: '500',
                      textDecorationLine: item.completed ? 'line-through' : 'none',
                      color: item.completed ? colors.textSecondary : colors.text,
                    }
                  ]}>
                    {item.title}
                  </Text>
                  {item.description && (
                    <Text style={[
                      commonStyles.textSecondary,
                      {
                        marginTop: 4,
                        textDecorationLine: item.completed ? 'line-through' : 'none',
                      }
                    ]}>
                      {item.description}
                    </Text>
                  )}
                </View>
                <View style={commonStyles.centerContent}>
                  <Icon
                    name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
                    size={24}
                    color={item.completed ? colors.success : colors.textSecondary}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Stats */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 12 }]}>
            {t('quickStats')}
          </Text>
          <View style={commonStyles.row}>
            <View style={commonStyles.centerContent}>
              <Text style={[commonStyles.title, { fontSize: 20, color: colors.primary }]}>
                {stats.tasksCompleted}
              </Text>
              <Text style={commonStyles.textSecondary}>{t('tasksDone')}</Text>
            </View>
            <View style={commonStyles.centerContent}>
              <Text style={[commonStyles.title, { fontSize: 20, color: colors.success }]}>
                {stats.avgObjectiveProgress}%
              </Text>
              <Text style={commonStyles.textSecondary}>{t('objectives')}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
