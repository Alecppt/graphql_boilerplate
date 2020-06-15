import { ValidationError } from 'yup';

export const formatYupErr = (err: ValidationError) => {
  const errors: Array<{ path: string; message: string }> = [];
  if (err.inner.length !== 0) {
    err.inner.forEach((e) => {
      errors.push({ path: e.path, message: e.message });
    });
  } else {
    errors.push({ path: err.path, message: err.message });
  }
  return errors;
};
