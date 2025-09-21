
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../../styles/commonStyles';
import { useCalendarData } from '../../hooks/useCalendarData';
import { useTranslation } from '../../hooks/useTranslation';
import Icon from '../../components/Icon';
import ProgressCircle from '../../components/ProgressCircle';

export default function ResultsScreen() {
  const { dailyResult, updateDailyResult, getStats } = useCalendarData();
  const { t, formatDate } = useTranslation();
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
    return formatDate(today);
  };

  const getRatingColor = (stars: number) => {
    if (stars >= 4) return colors.success;
    if (stars >= 3) return colors.warning;
    return colors.danger;
  };

  const getRatingText = (stars: number) => {
    switch (stars) {
      case 5: return t('excellentDay');
      case 4: return t('greatDay');
      case 3: return t('goodDay');
      case 2: return t('couldBeBetter');
      case 1: return t('toughDay');
      default: return '';
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.section}>
          <Text style={commonStyles.title}>{t('dailyResults')}</Text>
          <Text style={commonStyles.textSecondary}>{getCurrentDate()}</Text>
        </View>

        {/* Performance Overview */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 16 }]}>
            {t('todaysPerformance')}
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
                {t('tasks')}
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
                {t('program')}
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
                {t('objectives')}
              </Text>
            </View>
          </View>
        </View>

        {/* Detailed Stats */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 16 }]}>
            {t('detailedStatistics')}
          </Text>
          
          <View style={[commonStyles.row, { marginBottom: 12 }]}>
            <View style={{ flex: 1 }}>
              <Text style={commonStyles.text}>{t('tasksCompleted')}</Text>
              <Text style={commonStyles.textSecondary}>
                {stats.tasksCompleted} {t('of')} {stats.totalTasks}
              </Text>
            </View>
            <Text style={[commonStyles.title, { fontSize: 20, color: colors.primary }]}>
              {Math.round(stats.taskCompletionRate)}%
            </Text>
          </View>

          <View style={[commonStyles.row, { marginBottom: 12 }]}>
            <View style={{ flex: 1 }}>
              <Text style={commonStyles.text}>{t('programCompleted')}</Text>
              <Text style={commonStyles.textSecondary}>
                {stats.programCompleted} {t('of')} {stats.totalProgram}
              </Text>
            </View>
            <Text style={[commonStyles.title, { fontSize: 20, color: colors.secondary }]}>
              {Math.round(stats.programCompletionRate)}%
            </Text>
          </View>

          <View style={commonStyles.row}>
            <View style={{ flex: 1 }}>
              <Text style={commonStyles.text}>{t('averageObjectiveProgress')}</Text>
              <Text style={commonStyles.textSecondary}>
                {t('acrossAllObjectives')}
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
            {t('rateYourDay')}
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
            {getRatingText(rating)}
          </Text>
        </View>

        {/* Notes */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 12 }]}>
            {t('dailyNotes')}
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
            placeholder={t('notesPlaceholder')}
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
            {t('saveDailyResult')}
          </Text>
        </TouchableOpacity>

        {/* Saved Result Display */}
        {dailyResult && (
          <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt }]}>
            <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 12 }]}>
              {t('savedResult')}
            </Text>
            
            <View style={[commonStyles.row, { marginBottom: 8 }]}>
              <Text style={commonStyles.textSecondary}>{t('rating')}: </Text>
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
                {t('tasks')}: {dailyResult.tasksCompleted}/{dailyResult.totalTasks}
              </Text>
              <Text style={commonStyles.textSecondary}>
                {t('objectives')}: {dailyResult.objectivesProgress}%
              </Text>
            </View>

            {dailyResult.notes && (
              <>
                <Text style={[commonStyles.textSecondary, { fontWeight: '600', marginTop: 12, marginBottom: 4 }]}>
                  {t('notes')}:
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
