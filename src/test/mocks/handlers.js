import { userURL } from 'features/auth/api/user';
import { rest } from 'msw';
import { usersMocks } from './usersMocks';

export const handlers = [
  rest.get(`${userURL}users`, (_, res, ctx) => res(ctx.status(200), ctx.json(usersMocks)))
];
