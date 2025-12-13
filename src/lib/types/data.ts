export type Exam = {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
};

export type ExamsApi = {
  message: string;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  exams: Exam[];
};

export type SubjectType = {
  _id: string;
  name: string;
  icon: string;
  createdAt?: string;
};

export type SubjecstResponse = {
  message: string;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  subjects: SubjectType[];
};

export type Answer = {
  answer: string;
  key: string;
};

export type Question = {
  answers: Answer[];
  type: string;
  _id: string;
  question: string;
  correct: string;
  subject: string;
  exam: {
    _id: string;
    title: string;
    duration: number;
    subject: string;
    numberOfQuestions: number;
    active: boolean;
    createdAt: string;
  };
  createdAt: string;
};

export type ExamApi = {
  message: string;
  questions: Question[];
};

export type Answers = {
  questionId: string;
  correct: string;
};

type CorrectAsnwer = {
  QID: string;
  Question: string;
  correctAnswer: string;
};

type WrongAnswer = {
  inCorrectAnswer: string;
} & CorrectAsnwer;

export type CorrectedQuestions = {
  WrongQuestions: WrongAnswer[];
  correct: number;
  wrong: number;
  correctQuestions: CorrectAsnwer[];
  message: string;
  total: string;
};

export type UserInfo = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type ServerError = {
  code: number;
  message: string;
};

export type ChangePasswordInfo = {
  oldPassword: string;
  password: string;
  rePassword: string;
};
