import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { CONFIG_OPTIONS } from '../common/common.consistant';
import { JwtModuleOptions } from './jwt.interface';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}

  public sign(email: string, loginSession: string): string {
    return jwt.sign({ email, loginSession }, this.options.privateKey);
  }

  public verify(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}
