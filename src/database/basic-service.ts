import { NotFoundException } from '@nestjs/common';
import {
  ModelDto,
  RelationsOptions,
  RelationsResolver,
} from 'src/common/types';
import { Repository } from 'typeorm';
import { RELATIONS } from './entity-relations';

export class BasicService<T, C extends ModelDto<T>, U extends ModelDto<T>> {
  private readonly modelName: string;

  constructor(protected readonly modelRepository: Repository<T>) {
    this.modelName = this.modelRepository.metadata.tableName;
  }

  findAll() {
    return this.modelRepository.find();
  }

  async findByIds(ids: number[]) {
    return await this.modelRepository.findByIds(ids);
  }

  async findOne(id: number, relationsOptions?: RelationsOptions<T>) {
    const defaultRelation: RelationsOptions<T> = {
      withRelations: true,
      explicit: undefined,
    };
    const { withRelations, explicit } = relationsOptions || defaultRelation;
    let model: T;
    if (withRelations || withRelations === undefined) {
      const relations = explicit ? explicit : RELATIONS[this.modelName];
      model = await this.modelRepository.findOne(id, { relations });
    } else {
      model = await this.modelRepository.findOne(id);
    }
    if (!model) {
      throw new NotFoundException(`${this.modelName} #${id} not found`);
    }
    return model;
  }

  async create(data: C, resolver?: RelationsResolver<T>) {
    // Create an instance of the model using data which is the create dto
    const newModel = this.modelRepository.create(data);
    if (resolver) await resolver(newModel, data);

    return this.modelRepository.save(newModel);
  }

  async update(id: number, changes: U, resolver?: RelationsResolver<T>) {
    const model = await this.findOne(id);
    if (resolver) await resolver(model, changes);

    this.modelRepository.merge(model, changes);
    return this.modelRepository.save(model);
  }

  async remove(id: number) {
    const model = await this.modelRepository.findOne(id);
    if (!model) {
      throw new NotFoundException(`${this.modelName} #${id} not found`);
    }
    await this.modelRepository.delete(model);
    return model;
  }
}
