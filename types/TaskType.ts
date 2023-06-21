import { ImageSourcePropType } from 'react-native';

export type TaskType = {
  id: number;
  name: string;
  notes: string;
  category: string;
  image: ImageSourcePropType;
  startDate: string;
  frequency: string;
  interval: string;
  checkins?: string[];
  instructions?: any[];
};
