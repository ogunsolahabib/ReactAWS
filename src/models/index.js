// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const CarColor = {
  "BLUE": "BLUE",
  "RED": "RED",
  "BLACK": "BLACK",
  "ORANGE": "ORANGE"
};

const CarMake = {
  "AUDI": "AUDI",
  "BMW": "BMW",
  "VAUXHAL": "VAUXHAL",
  "MERCEDES": "MERCEDES",
  "PEUGEOT": "PEUGEOT",
  "RENAULT": "RENAULT"
};

const { User } = initSchema(schema);

export {
  User,
  CarColor,
  CarMake
};