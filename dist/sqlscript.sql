-- Create the database
CREATE DATABASE IF NOT EXISTS StudentDB;

-- Use the database
USE StudentDB;

-- Create the tables

-- Table 1: Students
CREATE TABLE Students (
    StudentNumber INT PRIMARY KEY,
    StudentName VARCHAR(255),
    DateOfBirth DATE,
    Support VARCHAR(3)
);

-- Table 2: Exam Scores
CREATE TABLE ExamScores (
    StudentNumber INT,
    CourseName VARCHAR(255),
    ExamScore INT,
    FOREIGN KEY (StudentNumber) REFERENCES Students(StudentNumber)
);

-- Table 3: Courses
CREATE TABLE Courses (
    CourseName VARCHAR(255) PRIMARY KEY
);

-- Table 4: Exam Boards
CREATE TABLE ExamBoards (
    CourseName VARCHAR(255) PRIMARY KEY,
    ExamBoards VARCHAR(255)
);

-- Table 5: Teachers
CREATE TABLE Teachers (
    CourseName VARCHAR(255) PRIMARY KEY,
    TeacherName VARCHAR(255)
);

-- Table 6: Students Support
CREATE TABLE StudentsSupport (
    StudentNumber INT PRIMARY KEY,
    Support VARCHAR(3),
    FOREIGN KEY (StudentNumber) REFERENCES Students(StudentNumber)
);

-- Populate the tables with data

-- Table 1: Students
INSERT INTO Students (StudentNumber, StudentName, DateOfBirth, Support)
VALUES
    (1001, 'Bob Baker', '2001-08-25', 'No'),
    (1002, 'Sally Davies', '1999-10-02', 'Yes'),
    (1003, 'Mark Hanmill', '1995-06-05', 'No'),
    (1004, 'Anas Ali', '1980-08-03', 'No'),
    (1005, 'Cheuk Yin', '2002-05-01', 'Yes');

-- Table 2: Exam Scores
INSERT INTO ExamScores (StudentNumber, CourseName, ExamScore)
VALUES
    (1001, 'Computer Science', 78),
    (1002, 'Maths', 55),
    (1002, 'Biology', 55),
    (1002, 'Music', 55),
    (1003, 'Computer Science', 90),
    (1004, 'Maths', 70),
    (1004, 'Physics', 70),
    (1004, 'Biology', 70),
    (1005, 'Computer Science', 45),
    (1005, 'Maths', 45),
    (1005, 'Music', 45);

-- Table 3: Courses
INSERT INTO Courses (CourseName)
VALUES
    ('Computer Science'),
    ('Maths'),
    ('Physics'),
    ('Biology'),
    ('Music');

-- Table 4: Exam Boards
INSERT INTO ExamBoards (CourseName, ExamBoards)
VALUES
    ('Computer Science', 'BCS'),
    ('Maths', 'EdExcel'),
    ('Physics', 'OCR'),
    ('Biology', 'WJEC'),
    ('Music', 'AQA');

-- Table 5: Teachers
INSERT INTO Teachers (CourseName, TeacherName)
VALUES
    ('Computer Science', 'Mr Jones'),
    ('Maths', 'Ms Parker'),
    ('Physics', 'Mr Peters'),
    ('Biology', 'Mrs Patel'),
    ('Music', 'Ms Daniels');

-- Table 6: Students Support
INSERT INTO StudentsSupport (StudentNumber, Support)
VALUES
    (1001, 'No'),
    (1002, 'Yes'),
    (1003, 'No'),
    (1004, 'No'),
    (1005, 'Yes');
