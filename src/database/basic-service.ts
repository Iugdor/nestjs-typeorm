import { Logger, NotFoundException } from '@nestjs/common';
import { RelationsOptions, RelationsResolver } from 'src/common/types';
import { Repository } from 'typeorm';
import { RELATIONS } from './entity-relations';

export class BasicService<T, C, U> {
  private readonly modelName: string;
  private readonly logger: Logger;

  constructor(protected readonly modelRepository: Repository<T>) {
    this.modelName = this.modelRepository.metadata.tableName;
    this.logger = new Logger(this.constructor['name']);
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
    let newModel = this.modelRepository.create(data);
    if (resolver) await resolver(newModel, data);
    newModel = await this.modelRepository.save(newModel);
    this.logger.log(`${this.modelName} #${newModel} created`);
    return newModel;
  }

  async update(id: number, changes: U, resolver?: RelationsResolver<T>) {
    const model = await this.findOne(id);
    if (resolver) await resolver(model, changes);

    this.modelRepository.merge(model, changes);
    this.logger.log(`${this.modelName} #${id} updated`);
    return this.modelRepository.save(model);
  }

  async remove(id: number) {
    const model = await this.findOne(id);
    console.log(model);
    await this.modelRepository
      .createQueryBuilder()
      .delete()
      .whereInIds(id)
      .execute();
    this.logger.log(`${this.modelName} #${id} deleted`);
    return model;
  }

  save(model: T) {
    this.modelRepository.save(model);
  }
}
