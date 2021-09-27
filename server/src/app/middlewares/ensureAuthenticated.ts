import { Request } from 'express';
import { AuthChecker } from 'type-graphql';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface Context {
  token?: string;
  req?: Request;
}

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const ensureAuthenticated: AuthChecker<Context> = ({
  context: Context,
}): boolean => {
  const authHeader = Context.token;
  
  if (!authHeader) {
    throw new Error('JWT token is missing');
  }
  
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.secret);

    const { sub } = decoded as TokenPayload;

    Context.req.user = {
      id: sub,
    };

    return true;
  } catch (err) {
    throw new Error('Invalid JWT token');
  }
};

export default ensureAuthenticated;
