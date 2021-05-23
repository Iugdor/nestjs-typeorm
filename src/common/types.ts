import { DeepPartial, FindConditions } from 'typeorm';
import { FilterDto } from './dtos/filter.dto';

export type ModelDto<T> = DeepPartial<T>;

export type RelationsResolver<T> = (newModel: T, data) => void;

export type RelationsOptions<T> = {
  withRelations?;
  explicit?: (keyof T)[];
};

export type FilterResolver<T, F> = (
  params: F,
  where: FindConditions<T>,
) => void;
