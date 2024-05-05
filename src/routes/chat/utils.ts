import { allExpressions } from '$lib/babylon/constants';
import type { ExpressionType } from '$lib/babylon/types';

export const separateExpressionAndPrompt = (prompt: string) => {
  // Find all the expressions in the format of [Expression]
  const expressionRegex = /\[[A-Za-z]+\]/g;
  const matches = Array.from(prompt.matchAll(expressionRegex));
  let expression: string | undefined = matches?.[0]?.[0];

  if (expression) {
    // Remove the [] brackets
    expression = expression.replace(/[[\]]/g, '');

    // Determine if this expression is in the valid set
    const findValidExpression = allExpressions.find(
      (validExpression) => validExpression.toLowerCase() === expression?.toLowerCase()
    );

    if (!findValidExpression) {
      expression = undefined;
    } else {
      expression = findValidExpression;
    }
  }

  return {
    prompt: prompt.replaceAll(expressionRegex, ''),
    // Just use the first expression found
    expression: expression as ExpressionType
  };
};
