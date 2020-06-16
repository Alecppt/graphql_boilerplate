import { Request, Response } from 'express';
import { User } from '../entity/User';
import { redis } from '../util/redis';

export const confirmEmail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = await redis.get(id);
  //   console.log(id);
  if (userId) {
    await User.update({ id: userId }, { isConfirmed: true });
    redis.del(id);
    // console.log(id, 'ok');
    res.status(200).send('confirmed');
  } else {
    // console.log(id, 'not found');
    res.status(404).send('user not found');
  }
};
