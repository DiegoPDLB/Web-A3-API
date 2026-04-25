import { body, validationResult } from 'express-validator';

export const validateLogin = [
  body('username').trim().notEmpty().withMessage('username is required'),
  body('password').notEmpty().withMessage('password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

export const validateUserCreate = [
  body('name').trim().notEmpty().withMessage('name is required'),
  body('username').trim().notEmpty().withMessage('username is required'),
  body('password').isLength({ min: 6 }).withMessage('password must be at least 6 chars'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

export const validateUserUpdate = [
  body('name').optional().trim(),
  body('username').optional().trim(),
  body('password').optional().isLength({ min: 6 }).withMessage('password must be at least 6 chars'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

export default { validateLogin, validateUserCreate, validateUserUpdate };
