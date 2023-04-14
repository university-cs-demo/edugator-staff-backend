import {
  ValidationResult,
  object,
  string,
  boolean,
  date,
  array,
  number
} from 'joi';

enum TestCaseVisibility {
  IO_HIDDEN = 0,
  I_VISIBLE_O_HIDDEN = 1,
  IO_VISIBLE = 2
}

const validateTestCases = (testCases: any) => {
  return (
    testCases.length > 0 &&
    testCases.some(
      (testCase) => testCase['visibility'] === TestCaseVisibility.IO_VISIBLE
    )
  );
};

//Joi does not allow empty strings by default (Reason why 'min(1)' is not in the validation for strings)
const problemValidation = (data: any): ValidationResult => {
  const schema = object({
    moduleId: string().min(24).max(24).required(),
    statement: string().required(),
    title: string().required(),
    hidden: boolean().required(),
    langConfig: array().items({
      language: string().required(),
      selected: boolean().required(),
      code: {
        header: string().allow('').required(),
        body: string().allow('').required(),
        footer: string().allow('').required()
      },
      fileExtension: string().valid('.py','.java', '.cpp', '.h').min(1).required(),
      timeLimit: number(),
      memoryLimit: number(),
      buildCommand: string().allow('')
    }),
    dueDate: date().iso().required(),
    templatePackage: string().uri().required(),
    testCases: array().items({
      input: string().required(),
      expectedOutput: string().allow('').required(),
      hint: string().allow('').required(),
      visibility: number().valid(0, 1, 2).required()
    })
  });

  return schema.validate(data);
};

const problemValidationWithoutModuleId = (data: any): ValidationResult => {
  const schema = object({
    moduleId: string().min(24).max(24),
    statement: string().required(),
    title: string().required(),
    hidden: boolean().required(),
    langConfig: array().items({
      language: string().required(),
      selected: boolean().required(),
      code: {
        header: string().allow('').required(),
        body: string().allow('').required(),
        footer: string().allow('').required()
      },
      fileExtension: string().valid('.py','.java', '.cpp', '.h').min(1).required(),
      timeLimit: number(),
      memoryLimit: number(),
      buildCommand: string().allow('')
    }),
    dueDate: date().iso().required(),
    templatePackage: string().uri().required(),
    testCases: array().items({
      input: string().required(),
      expectedOutput: string().allow('').required(),
      hint: string().allow('').required(),
      visibility: number().valid(0, 1, 2).required()
    }),
  });

  return schema.validate(data);
};

export {
  problemValidation,
  problemValidationWithoutModuleId,
  validateTestCases,
  TestCaseVisibility
};
