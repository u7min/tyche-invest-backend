import {DynamicModule, Global, Module} from '@nestjs/common';
import {JwtService} from './jwt.service';
import {JwtModuleOptions} from './jwt.interface';
import {CONFIG_OPTIONS} from '../common/common.consistant';

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      exports: [JwtService],
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        JwtService,
      ],
    };
  }
}
