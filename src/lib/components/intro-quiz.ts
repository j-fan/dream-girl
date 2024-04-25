type QuizQuestion =
  | {
      question: string;
      type: 'open';
    }
  | {
      question: string;
      type: 'multiple-choice';
      options: string[];
    };

export const quiz: QuizQuestion[] = [
  {
    question: 'What is your name?',
    type: 'open'
  },
  {
    question: 'What is your gender?',
    type: 'multiple-choice',
    options: ['Male', 'Female', 'Non-binary / other']
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
