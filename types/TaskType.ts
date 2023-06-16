import { ImageSourcePropType } from 'react-native';

export type TaskType = {
  id: number;
  name: string;
  description: string;
  category: string;
  image: ImageSourcePropType;
  instructions?: any[];
};
