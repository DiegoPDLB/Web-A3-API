import crypto from 'crypto';
import { promisify } from 'util';

const randomBytesAsync = promisify(crypto.randomBytes);
const pbkdf2Async = promisify(crypto.pbkdf2);

const ITERATIONS = 100000;
const KEYLEN = 64;
const DIGEST = 'sha512';

export async function genSalt(size = 16) {
  const buf = await randomBytesAsync(size);
  return buf.toString('hex');
}

export async function hashPassword(password, salt) {
  const derived = await pbkdf2Async(password, salt, ITERATIONS, KEYLEN, DIGEST);
  return Buffer.from(derived).toString('hex');
}

export async function verifyPassword(password, salt, hash) {
  const derived = await pbkdf2Async(password, salt, ITERATIONS, KEYLEN, DIGEST);
  const derivedBuf = Buffer.from(derived);
  const hashBuf = Buffer.from(hash, 'hex');
  if (derivedBuf.length !== hashBuf.length) return false;
  return crypto.timingSafeEqual(derivedBuf, hashBuf);
}
