import * as bcrypt from 'bcryptjs';

export const validatePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const passwordsEquals = await bcrypt.compare(password, hashedPassword);

  return passwordsEquals;
};
