
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../../styles/commonStyles';
import { useCalendarData } from '../../hooks/useCalendarData';
import Icon from '../../components/Icon';
import SimpleBottomSheet from '../../components/BottomSheet';
import AddTaskForm from '../../components/AddTaskForm';

export default function TasksScreen() {
  const { tasks, toggleTask, addTask } = useCalendarData();
  const [showAddTask, setShowAddTask] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return colors.danger;
      case 'medium': return colors.warning;
      case 'low': return colors.success;
      default: return colors.textSecondary;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return 'alert-circle';
      case 'medium': return 'warning';
      case 'low': return 'information-circle';
      default: return 'ellipse';
    }
  };

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={[commonStyles.row, { marginBottom: 20 }]}>
          <View>
            <Text style={commonStyles.title}>Tasks</Text>
            <Text style={commonStyles.textSecondary}>
              {completedTasks.length} of {tasks.length} completed
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => setShowAddTask(true)}
          >
            <Icon name="add" size={20} color={colors.background} />
            <Text style={{
              color: colors.background,
              marginLeft: 4,
              fontWeight: '600',
            }}>
              Add Task
            </Text>
          </TouchableOpacity>
        </View>

        {/* Pending Tasks */}
        {pendingTasks.length > 0 && (
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Pending Tasks</Text>
            {pendingTasks.map((task) => (
              <TouchableOpacity
                key={task.id}
                style={[
                  commonStyles.card,
                  {
                    borderLeftWidth: 4,
                    borderLeftColor: getPriorityColor(task.priority),
                  }
                ]}
                onPress={() => toggleTask(task.id)}
              >
                <View style={commonStyles.row}>
                  <View style={{ flex: 1 }}>
                    <View style={[commonStyles.row, { marginBottom: 8 }]}>
                      <Icon
                        name={getPriorityIcon(task.priority)}
                        size={16}
                        color={getPriorityColor(task.priority)}
                      />
                      <Text style={[
                        commonStyles.textSecondary,
                        { marginLeft: 6, textTransform: 'capitalize' }
                      ]}>
                        {task.priority} Priority
                      </Text>
                    </View>
                    <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                      {task.title}
                    </Text>
                    {task.description && (
                      <Text style={[commonStyles.textSecondary, { marginTop: 4 }]}>
                        {task.description}
                      </Text>
                    )}
                    {task.dueDate && (
                      <Text style={[
                        commonStyles.textSecondary,
                        { marginTop: 4, fontWeight: '500' }
                      ]}>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </Text>
                    )}
                  </View>
                  <View style={commonStyles.centerContent}>
                    <Icon
                      name="ellipse-outline"
                      size={24}
                      color={colors.textSecondary}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Completed Tasks</Text>
            {completedTasks.map((task) => (
              <TouchableOpacity
                key={task.id}
                style={[
                  commonStyles.card,
                  {
                    backgroundColor: colors.backgroundAlt,
                    borderLeftWidth: 4,
                    borderLeftColor: colors.success,
                  }
                ]}
                onPress={() => toggleTask(task.id)}
              >
                <View style={commonStyles.row}>
                  <View style={{ flex: 1 }}>
                    <Text style={[
                      commonStyles.text,
                      {
                        fontWeight: '600',
                        textDecorationLine: 'line-through',
                        color: colors.textSecondary,
                      }
                    ]}>
                      {task.title}
                    </Text>
                    {task.description && (
                      <Text style={[
                        commonStyles.textSecondary,
                        { marginTop: 4, textDecorationLine: 'line-through' }
                      ]}>
                        {task.description}
                      </Text>
                    )}
                  </View>
                  <View style={commonStyles.centerContent}>
                    <Icon
                      name="checkmark-circle"
                      size={24}
                      color={colors.success}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {tasks.length === 0 && (
          <View style={[commonStyles.centerContent, { marginTop: 60 }]}>
            <Icon name="checkmark-circle-outline" size={64} color={colors.textSecondary} />
            <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
              No tasks yet. Add your first task to get started!
            </Text>
          </View>
        )}
      </ScrollView>

      <SimpleBottomSheet
        isVisible={showAddTask}
        onClose={() => setShowAddTask(false)}
      >
        <AddTaskForm
          onAddTask={(task) => {
            addTask(task);
            setShowAddTask(false);
          }}
          onCancel={() => setShowAddTask(false)}
        />
      </SimpleBottomSheet>
    </SafeAreaView>
  );
}
