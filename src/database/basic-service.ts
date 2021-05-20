import { NotFoundException } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { RELATIONS } from './entity-relations';

type ModelDto<T> = DeepPartial<T>;

export class BasicService<T, C extends ModelDto<T>, U extends ModelDto<T>> {
  private readonly modelName: string;

  constructor(protected readonly modelRepository: Repository<T>) {
    this.modelName = this.modelRepository.metadata.tableName;
  }

  findAll() {
    return this.modelRepository.find();
  }

  async findOne(id: number) {
    const relations = RELATIONS[this.modelName];
    const model = await this.modelRepository.findOne(id, { relations });
    if (!model) {
      throw new NotFoundException(`${this.modelName} #${id} not found`);
    }
    return model;
  }

  async create(data: C, resolveRelations?: (newModel: T, data) => void) {
    // Create an instance of the model using data which is the create dto
    const newModel = this.modelRepository.create(data);
    if (resolveRelations) await resolveRelations(newModel, data);

    return this.modelRepository.save(newModel);
  }

  async update(id: number, changes: U) {
    const model = await this.findOne(id);
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
