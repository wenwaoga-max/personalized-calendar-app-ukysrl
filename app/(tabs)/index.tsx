
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../../styles/commonStyles';
import { useCalendarData } from '../../hooks/useCalendarData';
import { useTranslation } from '../../hooks/useTranslation';
import Icon from '../../components/Icon';
import SimpleBottomSheet from '../../components/BottomSheet';
import AddProgramForm from '../../components/AddProgramForm';

export default function DailyProgramScreen() {
  const { 
    dailyProgram, 
    toggleProgramItem, 
    addProgramItem,
    updateProgramItem,
    deleteProgramItem,
    getProgramsForDate,
    getStats 
  } = useCalendarData();
  
  const { t, formatDate } = useTranslation();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  
  const stats = getStats();
  const programsForSelectedDate = getProgramsForDate(selectedDate);

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

  const handleAddProgram = (programData: {
    date: string;
    time: string;
    title: string;
    description?: string;
    note?: string;
  }) => {
    if (editingProgram) {
      updateProgramItem(editingProgram.id, programData);
      setEditingProgram(null);
    } else {
      addProgramItem(programData);
    }
    setShowAddForm(false);
  };

  const handleEditProgram = (program: any) => {
    setEditingProgram(program);
    setShowAddForm(true);
  };

  const handleDeleteProgram = (id: string, title: string) => {
    Alert.alert(
      t('delete'),
      `Êtes-vous sûr de vouloir supprimer "${title}" ?`,
      [
        { text: t('cancel'), style: 'cancel' },
        { 
          text: t('delete'), 
          style: 'destructive',
          onPress: () => deleteProgramItem(id)
        }
      ]
    );
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingProgram(null);
  };

  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const isToday = (dateString: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateString === today;
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.section}>
          <View style={commonStyles.row}>
            <View style={{ flex: 1 }}>
              <Text style={commonStyles.title}>{t('dailyProgram')}</Text>
              <Text style={commonStyles.textSecondary}>{getCurrentDate()}</Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                borderRadius: 12,
                padding: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setShowAddForm(true)}
            >
              <Icon name="add" size={24} color={colors.background} />
            </TouchableOpacity>
          </View>
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
          <Text style={commonStyles.subtitle}>
            {isToday(selectedDate) ? t('schedule') : `${t('programsForDate')} ${formatDateForDisplay(selectedDate)}`}
          </Text>
          
          {programsForSelectedDate.length === 0 ? (
            <View style={[commonStyles.card, { padding: 40, alignItems: 'center' }]}>
              <Icon name="calendar-outline" size={48} color={colors.textSecondary} />
              <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginTop: 16 }]}>
                {t('noProgramsYet')}
              </Text>
            </View>
          ) : (
            programsForSelectedDate.map((item) => (
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
                    {item.note && (
                      <View style={{
                        backgroundColor: colors.backgroundAlt,
                        borderRadius: 8,
                        padding: 8,
                        marginTop: 8,
                      }}>
                        <Text style={[
                          commonStyles.textSecondary,
                          {
                            fontStyle: 'italic',
                            textDecorationLine: item.completed ? 'line-through' : 'none',
                          }
                        ]}>
                          💡 {item.note}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <TouchableOpacity
                      onPress={() => handleEditProgram(item)}
                      style={{ padding: 8 }}
                    >
                      <Icon name="create-outline" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDeleteProgram(item.id, item.title)}
                      style={{ padding: 8 }}
                    >
                      <Icon name="trash-outline" size={20} color={colors.error} />
                    </TouchableOpacity>
                    <View style={commonStyles.centerContent}>
                      <Icon
                        name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
                        size={24}
                        color={item.completed ? colors.success : colors.textSecondary}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
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

      <SimpleBottomSheet
        isVisible={showAddForm}
        onClose={handleCloseForm}
      >
        <AddProgramForm
          onAddProgram={handleAddProgram}
          onCancel={handleCloseForm}
          initialData={editingProgram}
          isEditing={!!editingProgram}
        />
      </SimpleBottomSheet>
    </SafeAreaView>
  );
}
