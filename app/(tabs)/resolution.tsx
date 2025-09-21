
import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../../styles/commonStyles';
import { useCalendarData } from '../../hooks/useCalendarData';
import { useTranslation } from '../../hooks/useTranslation';
import Icon from '../../components/Icon';

export default function ResolutionScreen() {
  const { dailyResolution, updateResolution } = useCalendarData();
  const { t, formatDate } = useTranslation();
  const [resolution, setResolution] = useState(dailyResolution?.resolution || '');
  const [reflection, setReflection] = useState(dailyResolution?.reflection || '');
  const [mood, setMood] = useState<'excellent' | 'good' | 'neutral' | 'poor'>(
    dailyResolution?.mood || 'neutral'
  );

  const handleSave = () => {
    if (!resolution.trim()) {
      console.log('Resolution is required');
      return;
    }

    updateResolution({
      date: new Date().toISOString().split('T')[0],
      resolution: resolution.trim(),
      reflection: reflection.trim() || undefined,
      mood,
    });

    console.log('Resolution saved successfully');
  };

  const getMoodIcon = (moodType: string) => {
    switch (moodType) {
      case 'excellent': return 'happy';
      case 'good': return 'happy-outline';
      case 'neutral': return 'remove-circle-outline';
      case 'poor': return 'sad-outline';
      default: return 'remove-circle-outline';
    }
  };

  const getMoodColor = (moodType: string) => {
    switch (moodType) {
      case 'excellent': return colors.success;
      case 'good': return '#2ECC71';
      case 'neutral': return colors.warning;
      case 'poor': return colors.danger;
      default: return colors.textSecondary;
    }
  };

  const getMoodText = (moodType: string) => {
    switch (moodType) {
      case 'excellent': return t('excellent');
      case 'good': return t('good');
      case 'neutral': return t('neutral');
      case 'poor': return t('poor');
      default: return moodType;
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    return formatDate(today);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.section}>
          <Text style={commonStyles.title}>{t('dailyResolution')}</Text>
          <Text style={commonStyles.textSecondary}>{getCurrentDate()}</Text>
        </View>

        {/* Resolution Input */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 12 }]}>
            {t('todaysResolution')}
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
            value={resolution}
            onChangeText={setResolution}
            placeholder={t('resolutionPlaceholder')}
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Mood Selection */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 16 }]}>
            {t('currentMood')}
          </Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
            {(['excellent', 'good', 'neutral', 'poor'] as const).map((moodType) => (
              <TouchableOpacity
                key={moodType}
                style={{
                  alignItems: 'center',
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor: mood === moodType ? colors.backgroundAlt : 'transparent',
                  borderWidth: mood === moodType ? 2 : 0,
                  borderColor: getMoodColor(moodType),
                }}
                onPress={() => setMood(moodType)}
              >
                <Icon
                  name={getMoodIcon(moodType)}
                  size={32}
                  color={getMoodColor(moodType)}
                />
                <Text style={[
                  commonStyles.textSecondary,
                  {
                    marginTop: 4,
                    textTransform: 'capitalize',
                    color: mood === moodType ? getMoodColor(moodType) : colors.textSecondary,
                    fontWeight: mood === moodType ? '600' : '400',
                  }
                ]}>
                  {getMoodText(moodType)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Evening Reflection */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 12 }]}>
            {t('eveningReflection')}
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
            value={reflection}
            onChangeText={setReflection}
            placeholder={t('reflectionPlaceholder')}
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
          onPress={handleSave}
        >
          <Text style={{
            color: colors.background,
            fontSize: 16,
            fontWeight: '600',
          }}>
            {t('saveResolution')}
          </Text>
        </TouchableOpacity>

        {/* Previous Resolution Display */}
        {dailyResolution && (
          <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt }]}>
            <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 12 }]}>
              {t('savedResolution')}
            </Text>
            <Text style={[commonStyles.text, { marginBottom: 8 }]}>
              {dailyResolution.resolution}
            </Text>
            {dailyResolution.reflection && (
              <>
                <Text style={[commonStyles.textSecondary, { fontWeight: '600', marginTop: 12, marginBottom: 4 }]}>
                  {t('reflection')}:
                </Text>
                <Text style={commonStyles.textSecondary}>
                  {dailyResolution.reflection}
                </Text>
              </>
            )}
            <View style={[commonStyles.row, { marginTop: 12 }]}>
              <Text style={commonStyles.textSecondary}>{t('mood')}: </Text>
              <Icon
                name={getMoodIcon(dailyResolution.mood)}
                size={20}
                color={getMoodColor(dailyResolution.mood)}
              />
              <Text style={[
                commonStyles.textSecondary,
                { marginLeft: 4, textTransform: 'capitalize' }
              ]}>
                {getMoodText(dailyResolution.mood)}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
