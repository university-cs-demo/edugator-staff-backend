import {
  LessonAttributesInput,
  LessonAttributes,
  Lesson
} from '../models/v2/lesson.model';

import { Op } from 'sequelize';
import { sequelize } from '../../config/database_v2';

export const create = async (
  payload: LessonAttributesInput
): Promise<LessonAttributes> => {
  const lesson = await Lesson.create(payload);
  return lesson.get({ plain: true });
};

export const getById = async (id: string): Promise<LessonAttributes> => {
  const lesson = await Lesson.findByPk(id);
  return lesson ? lesson.get({ plain: true }) : null;
};

export const deleteById = async (id: string): Promise<boolean> => {
  const numberOfDeletions = await Lesson.destroy({
    where: { id }
  });
  return !!numberOfDeletions;
};

export const deleteByModule = async (moduleId: string): Promise<boolean> => {
  const numberOfDeletions = await Lesson.destroy({
    where: { moduleId: moduleId }
  });
  return !!numberOfDeletions;
};

export const updateById = async (
  id: string,
  payload: LessonAttributesInput
): Promise<LessonAttributes | undefined> => {
  const lesson = await Lesson.findByPk(id);
  if (!lesson) {
    return undefined;
  }
  const updatedLesson = await lesson.update(payload);
  return updatedLesson.get({ plain: true });
};

export const getAll = async (): Promise<LessonAttributes[]> => {
  const lessons = await Lesson.findAll();
  return lessons.map((value) => value.get({ plain: true }));
};

export const shiftLessons = async (
  moduleId: string,
  orderNumber: number,
  newOrderNumber?: number
): Promise<void> => {
  if (!newOrderNumber) {
    await Lesson.update(
      { orderNumber: sequelize.literal('orderNumber - 1') },
      {
        where: {
          moduleId: moduleId,
          orderNumber: { [Op.gt]: orderNumber }
        }
      }
    );
  } else {
    await Lesson.update(
      {
        orderNumber: sequelize.literal(
          orderNumber < newOrderNumber ? 'orderNumber - 1' : 'orderNumber + 1'
        )
      },
      {
        where: {
          moduleId: moduleId,
          orderNumber: {
            [Op.gte]:
              orderNumber < newOrderNumber ? orderNumber : newOrderNumber,
            [Op.lte]:
              orderNumber < newOrderNumber ? newOrderNumber : orderNumber
          }
        }
      }
    );
  }
};