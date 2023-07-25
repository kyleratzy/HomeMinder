import { ImageSourcePropType } from 'react-native';

export type TaskType = {
  id: number;
  name: string;
  notes: string;
  category: string;
  importance: 'high' | 'medium' | 'low';
  image: ImageSourcePropType;
  frequency: string;
  interval: string;
  checkins: string[];
  nextDate?: string;
  instructions?: any[];
};
