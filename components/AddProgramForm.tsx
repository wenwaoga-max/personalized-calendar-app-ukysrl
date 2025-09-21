
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';
import { useTranslation } from '../hooks/useTranslation';
import DateTimePicker from '@react-native-community/datetimepicker';

interface AddProgramFormProps {
  onAddProgram: (program: {
    date: string;
    time: string;
    title: string;
    description?: string;
    note?: string;
  }) => void;
  onCancel: () => void;
  initialData?: {
    id?: string;
    date: string;
    time: string;
    title: string;
    description?: string;
    note?: string;
  };
  isEditing?: boolean;
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.backgroundAlt,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  requiredLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  required: {
    color: colors.error,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 2,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  dateTimeButton: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateTimeText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButtonText: {
    color: colors.background,
  },
  secondaryButtonText: {
    color: colors.text,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginTop: 4,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
});

export default function AddProgramForm({ 
  onAddProgram, 
  onCancel, 
  initialData,
  isEditing = false 
}: AddProgramFormProps) {
  const { t } = useTranslation();
  
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [note, setNote] = useState(initialData?.note || '');
  const [selectedDate, setSelectedDate] = useState(() => {
    if (initialData?.date) {
      return new Date(initialData.date);
    }
    return new Date();
  });
  const [selectedTime, setSelectedTime] = useState(() => {
    if (initialData?.time) {
      const [hours, minutes] = initialData.time.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date;
    }
    return new Date();
  });
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [titleError, setTitleError] = useState('');

  const validateForm = () => {
    let isValid = true;
    
    if (!title.trim()) {
      setTitleError(t('programTitleRequired'));
      isValid = false;
    } else {
      setTitleError('');
    }
    
    return isValid;
  };

  const handleSubmit = () => {
    console.log('Tentative de soumission du formulaire');
    
    if (!validateForm()) {
      console.log('Validation échouée');
      Alert.alert('Erreur', t('programTitleRequired'));
      return;
    }

    const dateString = selectedDate.toISOString().split('T')[0];
    const timeString = selectedTime.toTimeString().slice(0, 5);

    const programData = {
      date: dateString,
      time: timeString,
      title: title.trim(),
      description: description.trim() || undefined,
      note: note.trim() || undefined,
    };

    console.log('Données du programme à ajouter:', programData);
    
    onAddProgram(programData);
    
    // Afficher un message de confirmation
    Alert.alert(
      'Succès', 
      isEditing ? 'Programme modifié avec succès !' : 'Nouveau programme ajouté au planning !',
      [{ text: 'OK' }]
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const onDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
      console.log('Date sélectionnée:', date.toISOString().split('T')[0]);
    }
  };

  const onTimeChange = (event: any, date?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedTime(date);
      console.log('Heure sélectionnée:', date.toTimeString().slice(0, 5));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {isEditing ? t('editProgram') : t('addNewProgram')}
        </Text>
        <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
          <Icon name="close" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Champ Nouveau Programme */}
      <View style={styles.inputGroup}>
        <Text style={styles.requiredLabel}>
          {t('programTitle')} <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, titleError ? styles.inputError : null]}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            if (titleError && text.trim()) {
              setTitleError('');
            }
          }}
          placeholder={t('enterProgramTitle')}
          placeholderTextColor={colors.textSecondary}
        />
        {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}
      </View>

      <View style={styles.sectionDivider} />

      {/* Date du Programme */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{t('programDate')}</Text>
        <TouchableOpacity 
          style={styles.dateTimeButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateTimeText}>
            {formatDate(selectedDate)}
          </Text>
          <Icon name="calendar-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Heure du Programme */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{t('programTime')}</Text>
        <TouchableOpacity 
          style={styles.dateTimeButton}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.dateTimeText}>
            {formatTime(selectedTime)}
          </Text>
          <Icon name="time-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.sectionDivider} />

      {/* Description (optionnelle) */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{t('description')}</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder={t('enterProgramDescription')}
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={3}
        />
      </View>

      {/* Note */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{t('programNote')}</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={note}
          onChangeText={setNote}
          placeholder={t('enterProgramNote')}
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={3}
        />
      </View>

      {/* Boutons de validation */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]} 
          onPress={onCancel}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            {t('cancel')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]} 
          onPress={handleSubmit}
        >
          <Text style={[styles.buttonText, styles.primaryButtonText]}>
            {t('validate')}
          </Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      )}
    </View>
  );
}
