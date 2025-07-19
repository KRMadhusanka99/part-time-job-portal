import bcrypt from 'bcrypt'

export const hashPassword = async (password) => await bcrypt.hash(password, 10);
export const comparePassword = async (input, password) => await bcrypt.compare(input, password)