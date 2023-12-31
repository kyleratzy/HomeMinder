import { TaskType } from './types/TaskType';

export const TASKS: TaskType[] = [
  {
    id: 1,
    name: 'Clean Gutters',
    category: 'exterior',
    image: {
      uri: 'https://picsum.photos/100',
    },
    notes: '',
    importance: 'medium',
    frequency: '1',
    interval: 'days',
    checkins: [],
  },
  {
    id: 2,
    name: 'Replace HVAC Filter',
    category: 'hvac',
    image: {
      uri: 'https://picsum.photos/100',
    },
    notes: '',
    importance: 'low',
    frequency: '1',
    interval: 'days',
    checkins: [],
  },
  {
    id: 3,
    name: 'Clean Dryer Vents',
    category: 'appliances',
    image: {
      uri: 'https://picsum.photos/100',
    },
    notes: '',
    importance: 'high',
    frequency: '1',
    interval: 'days',
    checkins: [],
  },
  {
    id: 4,
    name: 'Clean Microwave Filter',
    category: 'appliances',
    image: {
      uri: 'https://picsum.photos/100',
    },
    notes: '',
    importance: 'low',
    frequency: '1',
    interval: 'days',
    checkins: [],
  },
  {
    id: 5,
    name: 'Test Smoke Alarms',
    category: 'general',
    image: {
      uri: 'https://picsum.photos/100',
    },
    notes: '',
    importance: 'medium',
    frequency: '1',
    interval: 'days',
    checkins: [],
  },
  {
    id: 6,
    name: 'Fertilize Lawn',
    category: 'landscaping',
    image: {
      uri: 'https://picsum.photos/100',
    },
    notes: '',
    importance: 'medium',
    interval: '1',
    frequency: 'days',
    checkins: [],
  },
  {
    id: 7,
    name: 'Fertilize Plants',
    category: 'landscaping',
    image: {
      uri: 'https://picsum.photos/100',
    },
    notes: '',
    importance: 'medium',
    frequency: '1',
    interval: 'days',
    checkins: [],
  },
  {
    id: 8,
    name: 'Aerate Lawn',
    category: 'landscaping',
    image: {
      uri: 'https://picsum.photos/100',
    },
    notes: '',
    importance: 'low',
    frequency: '1',
    interval: 'days',
    checkins: [],
  },
  {
    id: 9,
    name: 'Prune Trees',
    category: 'landscaping',
    image: {
      uri: 'https://picsum.photos/100',
    },
    notes: '',
    importance: 'low',
    frequency: '1',
    interval: 'days',
    checkins: [],
  },
];

export const USER_TASKS = [
  {
    id: 1,
    name: 'Replace HVAC Filter',
    description: '',
    category: 'hvac',
    image: { uri: 'https://picsum.photos/100' },
    frequency: 90,
    interval: 'days',
    checkins: ['2023-06-01'],
  },
  {
    id: 2,
    name: 'Prune Trees',
    description: '',
    category: 'landscaping',
    image: { uri: 'https://picsum.photos/100' },
    frequency: 1,
    interval: 'years',
    checkins: [],
  },
];

export const CATEGORIES = [
  { name: 'HVAC' },
  { name: 'Landscaping' },
  { name: 'Appliances' },
  { name: 'Plumbing' },
  { name: 'Exterior' },
  { name: 'Interior' },
];
