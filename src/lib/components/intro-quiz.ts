export type QuizQuestion =
  | {
      question: string;
      type: 'open';
      placeholder?: string;
      inputType: 'text' | 'number';
    }
  | {
      question: string;
      type: 'multiple-choice';
      options: string[];
    };

export type QuizAnswer = {
  question: string;
  answer: string;
};

export type QuizAnswers = QuizAnswer[];

export const quiz: QuizQuestion[] = [
  {
    question: 'What is your name?',
    type: 'open',
    placeholder: 'Enter your name',
    inputType: 'text'
  },
  {
    question: 'What is your gender?',
    type: 'multiple-choice',
    options: ['Male', 'Female', 'Non-binary / other']
  },
  {
    question: 'What is your age?',
    type: 'open',
    placeholder: 'Enter your age',
    inputType: 'number'
  },
  {
    question: 'Would you rather be considered:',
    type: 'multiple-choice',
    options: ['Weird', 'Normal']
  },
  {
    question: 'What are you looking for?',
    type: 'multiple-choice',
    options: [
      'Talking shame free',
      'Chatting about common interests',
      'Sharing emotions',
      'Feeling less lonely',
      'Role-playing'
    ]
  },
  {
    question: 'Which trait would you prefer in a partner?',
    type: 'multiple-choice',
    options: ['Shy and cute', 'Flirtatious and assertive']
  }
];
