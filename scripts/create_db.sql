CREATE TABLE IF NOT EXISTS Organization (
  id VARCHAR(255) NOT NULL PRIMARY KEY,
  name VARCHAR(255),
  logo VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `Course` (
  `id` VARCHAR(255) NOT NULL , 
  `courseName` VARCHAR(255) NOT NULL, 
  `startDate` DATETIME, 
  `endDate` DATETIME, 
  `logo` VARCHAR(255), 
  `createdAt` DATETIME NOT NULL, 
  `updatedAt` DATETIME NOT NULL, 
  PRIMARY KEY (`id`)
)

CREATE TABLE IF NOT EXISTS CourseEnrollment (
  courseId VARCHAR(255) NOT NULL,
  userId VARCHAR(255) NOT NULL,
  visibility VARCHAR(255),
  primary key (courseId, userId)
);

CREATE TABLE IF NOT EXISTS Module (
  id VARCHAR(255) NOT NULL PRIMARY KEY,
  courseId VARCHAR(255),
  name VARCHAR(255),
  orderNumber TINYINT(125)
);

CREATE TABLE IF NOT EXISTS Lesson (
  id VARCHAR(255) NOT NULL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  moduleId VARCHAR(255) NOT NULL,
  dateCreated VARCHAR(255) NOT NULL,
  dateUpdated VARCHAR(255) NOT NULL,
  orderNumber TINYINT(125)
);

CREATE TABLE IF NOT EXISTS Problem (
  id VARCHAR(255) NOT NULL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  hidden BOOLEAN NOT NULL,
  fileName VARCHAR(255),
  dueDate VARCHAR(255),
  statement TEXT,
  templatePackage VARCHAR(255),
  timeLimit SMALLINT unsigned NOT NULL DEFAULT 0,
  memoryLimit SMALLINT unsigned NOT NULL DEFAULT 0,
  buildCommand VARCHAR(255),
  orderNumber TINYINT(125)
);

CREATE TABLE IF NOT EXISTS Code (
  id VARCHAR(255) NOT NULL PRIMARY KEY,
  problemId VARCHAR(255),
  language VARCHAR(255),
  header TEXT,
  body TEXT,
  footer TEXT,
  fileExtension CHAR(10)
);

CREATE TABLE IF NOT EXISTS TestCase (
  id VARCHAR(255) NOT NULL PRIMARY KEY,
  problemId VARCHAR(255) NOT NULL,
  input VARCHAR(255) NOT NULL,
  expectedOutput VARCHAR(255) NOT NULL,
  hint VARCHAR(255) NOT NULL,
  visibility TINYINT(125)
);

CREATE TABLE IF NOT EXISTS Submission (
  id VARCHAR(255) NOT NULL PRIMARY KEY,
  courseID VARCHAR(255) NOT NULL,
  userID VARCHAR(255) NOT NULL,
  submissiontype VARCHAR(255) NOT NULL,
  submissionId VARCHAR(255) NOT NULL,
  submissionTime VARCHAR(255) NOT NULL
);





