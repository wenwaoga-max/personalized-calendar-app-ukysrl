
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../../styles/commonStyles';
import { useCalendarData } from '../../hooks/useCalendarData';
import Icon from '../../components/Icon';
import ProgressCircle from '../../components/ProgressCircle';

export default function ObjectivesScreen() {
  const { objectives, updateObjectiveProgress } = useCalendarData();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'personal': return 'person';
      case 'professional': return 'briefcase';
      case 'health': return 'fitness';
      case 'learning': return 'school';
      default: return 'flag';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'personal': return colors.primary;
      case 'professional': return colors.secondary;
      case 'health': return colors.success;
      case 'learning': return colors.warning;
      default: return colors.textSecondary;
    }
  };

  const handleProgressUpdate = (id: string, increment: number) => {
    const objective = objectives.find(obj => obj.id === id);
    if (objective) {
      const newProgress = Math.max(0, Math.min(100, objective.progress + increment));
      updateObjectiveProgress(id, newProgress);
    }
  };

  const completedObjectives = objectives.filter(obj => obj.completed);
  const activeObjectives = objectives.filter(obj => !obj.completed);

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.section}>
          <Text style={commonStyles.title}>Objectives</Text>
          <Text style={commonStyles.textSecondary}>
            {completedObjectives.length} of {objectives.length} completed
          </Text>
        </View>

        {/* Overview Stats */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 16 }]}>
            Progress Overview
          </Text>
          <View style={commonStyles.row}>
            <View style={commonStyles.centerContent}>
              <ProgressCircle
                progress={activeObjectives.reduce((sum, obj) => sum + obj.progress, 0) / activeObjectives.length || 0}
                size={80}
                strokeWidth={8}
                color={colors.primary}
              />
              <Text style={[commonStyles.textSecondary, { marginTop: 8 }]}>
                Average Progress
              </Text>
            </View>
            <View style={{ flex: 1, paddingLeft: 20 }}>
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <View style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: colors.success,
                  marginRight: 8,
                }} />
                <Text style={commonStyles.textSecondary}>
                  {completedObjectives.length} Completed
                </Text>
              </View>
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <View style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: colors.primary,
                  marginRight: 8,
                }} />
                <Text style={commonStyles.textSecondary}>
                  {activeObjectives.length} In Progress
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Active Objectives */}
        {activeObjectives.length > 0 && (
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Active Objectives</Text>
            {activeObjectives.map((objective) => (
              <View
                key={objective.id}
                style={[
                  commonStyles.card,
                  {
                    borderLeftWidth: 4,
                    borderLeftColor: getCategoryColor(objective.category),
                  }
                ]}
              >
                <View style={[commonStyles.row, { marginBottom: 12 }]}>
                  <View style={{ flex: 1 }}>
                    <View style={[commonStyles.row, { marginBottom: 8 }]}>
                      <Icon
                        name={getCategoryIcon(objective.category)}
                        size={16}
                        color={getCategoryColor(objective.category)}
                      />
                      <Text style={[
                        commonStyles.textSecondary,
                        { marginLeft: 6, textTransform: 'capitalize' }
                      ]}>
                        {objective.category}
                      </Text>
                    </View>
                    <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                      {objective.title}
                    </Text>
                    {objective.description && (
                      <Text style={[commonStyles.textSecondary, { marginTop: 4 }]}>
                        {objective.description}
                      </Text>
                    )}
                    <Text style={[
                      commonStyles.textSecondary,
                      { marginTop: 4, fontWeight: '500' }
                    ]}>
                      Target: {new Date(objective.targetDate).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={commonStyles.centerContent}>
                    <ProgressCircle
                      progress={objective.progress}
                      size={60}
                      strokeWidth={6}
                      color={getCategoryColor(objective.category)}
                    />
                  </View>
                </View>

                {/* Progress Controls */}
                <View style={[commonStyles.row, { marginTop: 12 }]}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.backgroundAlt,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 6,
                      marginRight: 8,
                    }}
                    onPress={() => handleProgressUpdate(objective.id, -5)}
                  >
                    <Text style={{ color: colors.text, fontWeight: '600' }}>-5%</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.primary,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 6,
                      marginRight: 8,
                    }}
                    onPress={() => handleProgressUpdate(objective.id, 5)}
                  >
                    <Text style={{ color: colors.background, fontWeight: '600' }}>+5%</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.success,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 6,
                    }}
                    onPress={() => handleProgressUpdate(objective.id, 10)}
                  >
                    <Text style={{ color: colors.background, fontWeight: '600' }}>+10%</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Completed Objectives */}
        {completedObjectives.length > 0 && (
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Completed Objectives</Text>
            {completedObjectives.map((objective) => (
              <View
                key={objective.id}
                style={[
                  commonStyles.card,
                  {
                    backgroundColor: colors.backgroundAlt,
                    borderLeftWidth: 4,
                    borderLeftColor: colors.success,
                  }
                ]}
              >
                <View style={commonStyles.row}>
                  <View style={{ flex: 1 }}>
                    <Text style={[
                      commonStyles.text,
                      { fontWeight: '600', color: colors.textSecondary }
                    ]}>
                      {objective.title}
                    </Text>
                    {objective.description && (
                      <Text style={[commonStyles.textSecondary, { marginTop: 4 }]}>
                        {objective.description}
                      </Text>
                    )}
                  </View>
                  <View style={commonStyles.centerContent}>
                    <Icon
                      name="checkmark-circle"
                      size={32}
                      color={colors.success}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {objectives.length === 0 && (
          <View style={[commonStyles.centerContent, { marginTop: 60 }]}>
            <Icon name="target-outline" size={64} color={colors.textSecondary} />
            <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
              No objectives set yet. Start by setting your first goal!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
