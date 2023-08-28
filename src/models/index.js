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

const { Draft, Record } = initSchema(schema);

export {
  Draft,
  Record,
  CarColor,
  CarMake
};