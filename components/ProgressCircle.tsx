
import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../styles/commonStyles';

interface ProgressCircleProps {
  progress: number; // 0-100
  size: number;
  strokeWidth: number;
  color: string;
  backgroundColor?: string;
  showPercentage?: boolean;
}

export default function ProgressCircle({
  progress,
  size,
  strokeWidth,
  color,
  backgroundColor = colors.backgroundAlt,
  showPercentage = true,
}: ProgressCircleProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={{ width: size, height: size, position: 'relative' }}>
      {/* Background Circle */}
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderColor: backgroundColor,
          position: 'absolute',
        }}
      />
      
      {/* Progress Circle - Using a simple approximation with border */}
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderColor: 'transparent',
          borderTopColor: color,
          borderRightColor: progress > 25 ? color : 'transparent',
          borderBottomColor: progress > 50 ? color : 'transparent',
          borderLeftColor: progress > 75 ? color : 'transparent',
          position: 'absolute',
          transform: [{ rotate: '-90deg' }],
        }}
      />

      {/* Percentage Text */}
      {showPercentage && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: size * 0.2,
              fontWeight: '600',
              color: colors.text,
            }}
          >
            {Math.round(progress)}%
          </Text>
        </View>
      )}
    </View>
  );
}
