export type QuestionKey =
  | 'name'
  | 'gender'
  | 'age'
  | 'you-considered-as'
  | 'looking-for'
  | 'preferred-personality';
export type QuizQuestion =
  | {
      key: QuestionKey;
      question: string;
      type: 'open';
      placeholder?: string;
      inputType: 'text' | 'number';
    }
  | {
      key: QuestionKey;
      question: string;
      type: 'multiple-choice';
      options: string[];
    };

export type QuizAnswer = {
  key: QuestionKey;
  question: string;
  answer: string;
};

export type QuizAnswers = QuizAnswer[];

export const quiz: QuizQuestion[] = [
  {
    key: 'name',
    question: 'What is your name?',
    type: 'open',
    placeholder: 'Enter your name',
    inputType: 'text'
  },
  {
    key: 'gender',
    question: 'What is your gender?',
    type: 'multiple-choice',
    options: ['Male', 'Female', 'Non-binary / other']
  },
  {
    key: 'age',
    question: 'What is your age?',
    type: 'open',
    placeholder: 'Enter your age',
    inputType: 'number'
  },
  {
    key: 'you-considered-as',
    question: 'Would you rather be considered:',
    type: 'multiple-choice',
    options: ['Weird', 'Normal']
  },
  {
    key: 'looking-for',
    question: 'What are you looking for?',
    type: 'multiple-choice',
    options: [
      'Talk shame free',
      'Chat about common interests',
      'Share emotions',
      'Feel less lonely',
      'Role-play'
    ]
  },
  {
    key: 'preferred-personality',
    question: 'Which trait would you prefer in a partner?',
    type: 'multiple-choice',
    options: ['Shy and cute', 'Flirtatious and assertive']
  }
];
