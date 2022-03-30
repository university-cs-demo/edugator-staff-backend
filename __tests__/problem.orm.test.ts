import { createConnection, Connection } from 'mysql2';
import { ProblemInterface } from '../src/api/models/problem.model';
import {
  clearTestData,
  insertTestData,
  testProblems
} from '../src/migration/insertTestData';
import { ProblemOrm, ProblemDocument } from '../src/migration/problem.orm';

const compareProblems = (a: ProblemInterface, b: ProblemInterface) => {
  if (a.title < b.title) {
    return -1;
  } else if (a.title > b.title) {
    return 1;
  } else {
    return 0;
  }
};

const dropIdField = (problem: ProblemDocument): ProblemInterface => {
  delete problem._id;
  return problem;
};

/*
 * TODO: These tests are unstable due to reliance on an external database.
 * More reliable error handling and fast-failing should be implemented,
 * particularly because database errors make the testing pipeline take
 * much longer (10-20 sec). It might be best to omit them by default.
 */

describe('ProblemORM Class', () => {
  const problems = testProblems.sort(compareProblems);
  let connection: Connection;
  let problem: ProblemOrm;

  beforeAll(async () => {
    connection = createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    connection.connect(function (err) {
      if (err) {
        fail(err);
      }
    });
    problem = new ProblemOrm(connection);
    await clearTestData(connection);
    return insertTestData(connection);
  });

  afterAll(async () => {
    await clearTestData(connection);
    connection.end(function (err) {
      if (err) {
        connection.destroy();
        fail(err);
      }
    });
  });

  describe('findAll function', () => {
    it('checks whether all items are returned', async () => {
      let results: ProblemDocument[] = [];
      try {
        results = await problem.findAll();
      } catch (err) {
        fail(err);
      }
      expect(results.map((x) => dropIdField(x)).sort(compareProblems)).toEqual(
        problems
      );
    });
  });

  describe('find function', () => {
    it('checks whether filtering by title succeeds', async () => {
      let results: ProblemDocument[] = [];
      try {
        results = await problem.find({ title: 'test title 1' });
      } catch (err) {
        fail(err);
      }
      expect(results.length).toEqual(1);
      expect(results[0]).toMatchObject(problems[0]);
    });

    it('checks whether filtering by all properties succeeds', async () => {
      let results: ProblemDocument[] = [];
      try {
        results = await problem.find({
          statement: 'test statement 2',
          title: 'test title 2',
          hidden: false,
          language: 'cpp',
          dueDate: new Date('2022-12-31T01:00:00'),
          fileExtension: '.cpp',
          templatePackage: 'test template_package 2',
          timeLimit: 1.0,
          memoryLimit: 1.0,
          buildCommand: 'test build_command 2'
        });
      } catch (err) {
        fail(err);
      }
      expect(results.length).toEqual(1);
      expect(results[0]).toMatchObject(problems[1]);
    });

    it('checks whether filtering by null succeeds', async () => {
      let results: ProblemDocument[] = [];
      try {
        results = await problem.find({ title: null });
      } catch (err) {
        fail(err);
      }
      expect(results.length).toEqual(0);
    });
  });
});