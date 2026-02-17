// Simulate a real database by importing
// the "poison pill" from 'server-only'
//
// This will cause any Client Component
// importing this file to break
import 'server-only';

export const animals = [
  {
    id: 1,
    firstName: 'Dennis',
    type: 'goat',
    accessory: 'expired library card',
    birthDate: new Date('2015-04-09'),
  },
  {
    id: 2,
    firstName: 'Monica',
    type: 'owl',
    accessory: 'laser pointer',
    birthDate: new Date('2018-11-02'),
  },
  {
    id: 3,
    firstName: 'Trevor',
    type: 'iguana',
    accessory: 'plastic fork collection',
    birthDate: new Date('2020-08-17'),
  },
  {
    id: 4,
    firstName: 'Sharon',
    type: 'seal',
    accessory: 'mysterious key labeled "DO NOT"',
    birthDate: new Date('2016-01-26'),
  },
  {
    id: 5,
    firstName: 'Paul',
    type: 'pigeon',
    accessory: 'tiny briefcase full of bread receipts',
    birthDate: new Date('2019-07-13'),
  },
];
