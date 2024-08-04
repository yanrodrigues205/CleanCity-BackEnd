import crypto from 'crypto';

const generateOTP = (): string => {
  return crypto.randomBytes(3).toString('hex');
};

export default generateOTP;