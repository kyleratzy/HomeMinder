import { ImageSourcePropType } from 'react-native';

export type TaskType = {
  id: number;
  name: string;
  notes: string;
  category: string;
  image: ImageSourcePropType;
  startDate: Date;
  frequency: string;
  interval: string;
  checkins?: Date[];
  instructions?: any[];
};
