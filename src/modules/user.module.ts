import { Module } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { DatabaseModule } from './database/database.module';
import { UserController } from 'src/controllers/user.controller';

@Module({
  imports: [DatabaseModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
