import { MiddlewareFn } from 'type-graphql/dist/interfaces/Middleware';
import { ContextInterface } from '../../types/ContextInterface';
// import { User } from '../../entity/User';

export const isAuth: MiddlewareFn<ContextInterface> = async (
  { context },
  next
) => {
  if (!context.req.session!.userId) {
    throw new Error('not authenticated!');
  }
  //comment out for now, for testing
  // const user = await User.findOne(context.req.session!.userId);
  // if (!user!.isConfirmed) {
  //   throw new Error('the account is not confirmed yet!');
  // }
  return next();
};
