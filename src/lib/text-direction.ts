const rtlCharacterPattern = /[\u0590-\u08FF]/;
const ltrCharacterPattern = /[A-Za-z]/;

export const detectTextDirection = (text?: string): 'ltr' | 'rtl' => {
  const normalizedText = text?.trim();
  if (!normalizedText) {
    return 'ltr';
  }

  if (rtlCharacterPattern.test(normalizedText)) {
    return 'rtl';
  }

  if (ltrCharacterPattern.test(normalizedText)) {
    return 'ltr';
  }

  return 'ltr';
};
