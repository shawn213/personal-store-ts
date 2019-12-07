import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { User } from '../../db/models/User';

class JwtUtil {
  private static readonly payloadKeys = ['userId', 'username', 'email', 'cellPhone', 'authority'];

  static generate(user: User, url: string): string {
    let payload = _.pick(user, this.payloadKeys);
    return jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: 'RS256',
      expiresIn: '30m',
      issuer: url,
      subject: user.id
    });
  }

  static decode(payload: any): any {
    let user = _.pick(payload, this.payloadKeys);
    user['id'] = payload['sub'];
    return user;
  }
}
