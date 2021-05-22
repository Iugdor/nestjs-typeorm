import { DeepPartial } from 'typeorm';

export type ModelDto<T> = DeepPartial<T>;

export type RelationsResolver<T> = (newModel: T, data) => void;

export type RelationsOptions<T> = {
  withRelations?;
  explicit?: (keyof T)[];
};
