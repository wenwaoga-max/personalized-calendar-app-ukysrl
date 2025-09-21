
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#4A90E2',      // Modern blue
  secondary: '#357ABD',    // Darker blue
  accent: '#64B5F6',       // Light blue accent
  background: '#FFFFFF',   // White background for light theme
  backgroundAlt: '#F8F9FA', // Light gray alternative
  text: '#2C3E50',         // Dark text for readability
  textSecondary: '#7F8C8D', // Secondary text color
  success: '#27AE60',      // Green for completed tasks
  warning: '#F39C12',      // Orange for pending
  danger: '#E74C3C',       // Red for overdue
  grey: '#BDC3C7',         // Light grey
  card: '#FFFFFF',         // White cards
  border: '#E1E8ED',       // Light border
  shadow: 'rgba(0, 0, 0, 0.1)', // Light shadow
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  textSecondary: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 24,
  },
  textSecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
});
