import { MiddlewareFn } from 'type-graphql/dist/interfaces/Middleware';
import { ContextInterface } from '../../types/ContextInterface';

export const isAuth: MiddlewareFn<ContextInterface> = async (
  { context },
  next
) => {
  if (!context.req.session!.userId) {
    throw new Error('not authenticated!');
  }
  return next();
};
