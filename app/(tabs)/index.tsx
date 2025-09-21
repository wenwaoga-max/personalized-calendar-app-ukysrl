
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../../styles/commonStyles';
import { useCalendarData } from '../../hooks/useCalendarData';
import Icon from '../../components/Icon';

export default function DailyProgramScreen() {
  const { dailyProgram, toggleProgramItem, getStats } = useCalendarData();
  const stats = getStats();

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.section}>
          <Text style={commonStyles.title}>Daily Program</Text>
          <Text style={commonStyles.textSecondary}>{getCurrentDate()}</Text>
        </View>

        {/* Progress Overview */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <View style={commonStyles.row}>
            <View style={{ flex: 1 }}>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                Today&apos;s Progress
              </Text>
              <Text style={commonStyles.textSecondary}>
                {stats.programCompleted} of {stats.totalProgram} completed
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
          <Text style={commonStyles.subtitle}>Schedule</Text>
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
            Quick Stats
          </Text>
          <View style={commonStyles.row}>
            <View style={commonStyles.centerContent}>
              <Text style={[commonStyles.title, { fontSize: 20, color: colors.primary }]}>
                {stats.tasksCompleted}
              </Text>
              <Text style={commonStyles.textSecondary}>Tasks Done</Text>
            </View>
            <View style={commonStyles.centerContent}>
              <Text style={[commonStyles.title, { fontSize: 20, color: colors.success }]}>
                {stats.avgObjectiveProgress}%
              </Text>
              <Text style={commonStyles.textSecondary}>Objectives</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
