import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import {
  AllCategoriesInput,
  AllCategoriesOutput,
} from './dtos/all-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categories: Repository<Category>,
  ) {}

  async findAllCategories({
    parentId,
  }: AllCategoriesInput): Promise<AllCategoriesOutput> {
    try {
      const categories = await this.categories.find({
        parentId: parentId ?? null,
      });
      return { ok: true, categories };
    } catch (e) {
      return {
        ok: false,
        error: 'Could not find all categories.',
      };
    }
  }
}
