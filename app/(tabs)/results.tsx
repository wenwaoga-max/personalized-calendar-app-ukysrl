
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../../styles/commonStyles';
import { useCalendarData } from '../../hooks/useCalendarData';
import Icon from '../../components/Icon';
import ProgressCircle from '../../components/ProgressCircle';

export default function ResultsScreen() {
  const { dailyResult, updateDailyResult, getStats } = useCalendarData();
  const [notes, setNotes] = useState(dailyResult?.notes || '');
  const [rating, setRating] = useState(dailyResult?.rating || 3);
  
  const stats = getStats();

  const handleSaveResult = () => {
    updateDailyResult({
      date: new Date().toISOString().split('T')[0],
      tasksCompleted: stats.tasksCompleted,
      totalTasks: stats.totalTasks,
      objectivesProgress: stats.avgObjectiveProgress,
      notes: notes.trim() || undefined,
      rating,
    });

    console.log('Daily result saved successfully');
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

  const getRatingColor = (stars: number) => {
    if (stars >= 4) return colors.success;
    if (stars >= 3) return colors.warning;
    return colors.danger;
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.section}>
          <Text style={commonStyles.title}>Daily Results</Text>
          <Text style={commonStyles.textSecondary}>{getCurrentDate()}</Text>
        </View>

        {/* Performance Overview */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 16 }]}>
            Today&apos;s Performance
          </Text>
          <View style={commonStyles.row}>
            <View style={commonStyles.centerContent}>
              <ProgressCircle
                progress={stats.taskCompletionRate}
                size={80}
                strokeWidth={8}
                color={colors.primary}
              />
              <Text style={[commonStyles.textSecondary, { marginTop: 8 }]}>
                Tasks
              </Text>
            </View>
            <View style={commonStyles.centerContent}>
              <ProgressCircle
                progress={stats.programCompletionRate}
                size={80}
                strokeWidth={8}
                color={colors.secondary}
              />
              <Text style={[commonStyles.textSecondary, { marginTop: 8 }]}>
                Program
              </Text>
            </View>
            <View style={commonStyles.centerContent}>
              <ProgressCircle
                progress={stats.avgObjectiveProgress}
                size={80}
                strokeWidth={8}
                color={colors.success}
              />
              <Text style={[commonStyles.textSecondary, { marginTop: 8 }]}>
                Objectives
              </Text>
            </View>
          </View>
        </View>

        {/* Detailed Stats */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 16 }]}>
            Detailed Statistics
          </Text>
          
          <View style={[commonStyles.row, { marginBottom: 12 }]}>
            <View style={{ flex: 1 }}>
              <Text style={commonStyles.text}>Tasks Completed</Text>
              <Text style={commonStyles.textSecondary}>
                {stats.tasksCompleted} of {stats.totalTasks}
              </Text>
            </View>
            <Text style={[commonStyles.title, { fontSize: 20, color: colors.primary }]}>
              {Math.round(stats.taskCompletionRate)}%
            </Text>
          </View>

          <View style={[commonStyles.row, { marginBottom: 12 }]}>
            <View style={{ flex: 1 }}>
              <Text style={commonStyles.text}>Program Completed</Text>
              <Text style={commonStyles.textSecondary}>
                {stats.programCompleted} of {stats.totalProgram}
              </Text>
            </View>
            <Text style={[commonStyles.title, { fontSize: 20, color: colors.secondary }]}>
              {Math.round(stats.programCompletionRate)}%
            </Text>
          </View>

          <View style={commonStyles.row}>
            <View style={{ flex: 1 }}>
              <Text style={commonStyles.text}>Average Objective Progress</Text>
              <Text style={commonStyles.textSecondary}>
                Across all objectives
              </Text>
            </View>
            <Text style={[commonStyles.title, { fontSize: 20, color: colors.success }]}>
              {stats.avgObjectiveProgress}%
            </Text>
          </View>
        </View>

        {/* Day Rating */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 16 }]}>
            Rate Your Day
          </Text>
          <View style={[commonStyles.row, { justifyContent: 'center', marginBottom: 16 }]}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                style={{ marginHorizontal: 8 }}
                onPress={() => setRating(star)}
              >
                <Icon
                  name={star <= rating ? 'star' : 'star-outline'}
                  size={32}
                  color={star <= rating ? getRatingColor(rating) : colors.textSecondary}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
            {rating === 5 && 'Excellent day!'}
            {rating === 4 && 'Great day!'}
            {rating === 3 && 'Good day'}
            {rating === 2 && 'Could be better'}
            {rating === 1 && 'Tough day'}
          </Text>
        </View>

        {/* Notes */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 12 }]}>
            Daily Notes
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 12,
              fontSize: 16,
              color: colors.text,
              backgroundColor: colors.background,
              minHeight: 100,
              textAlignVertical: 'top',
            }}
            value={notes}
            onChangeText={setNotes}
            placeholder="What went well today? What could be improved?"
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: 'center',
            marginBottom: 20,
          }}
          onPress={handleSaveResult}
        >
          <Text style={{
            color: colors.background,
            fontSize: 16,
            fontWeight: '600',
          }}>
            Save Daily Result
          </Text>
        </TouchableOpacity>

        {/* Saved Result Display */}
        {dailyResult && (
          <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt }]}>
            <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 12 }]}>
              Saved Result
            </Text>
            
            <View style={[commonStyles.row, { marginBottom: 8 }]}>
              <Text style={commonStyles.textSecondary}>Rating: </Text>
              <View style={{ flexDirection: 'row' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon
                    key={star}
                    name={star <= dailyResult.rating ? 'star' : 'star-outline'}
                    size={16}
                    color={star <= dailyResult.rating ? getRatingColor(dailyResult.rating) : colors.textSecondary}
                  />
                ))}
              </View>
            </View>

            <View style={[commonStyles.row, { marginBottom: 8 }]}>
              <Text style={commonStyles.textSecondary}>
                Tasks: {dailyResult.tasksCompleted}/{dailyResult.totalTasks}
              </Text>
              <Text style={commonStyles.textSecondary}>
                Objectives: {dailyResult.objectivesProgress}%
              </Text>
            </View>

            {dailyResult.notes && (
              <>
                <Text style={[commonStyles.textSecondary, { fontWeight: '600', marginTop: 12, marginBottom: 4 }]}>
                  Notes:
                </Text>
                <Text style={commonStyles.textSecondary}>
                  {dailyResult.notes}
                </Text>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
