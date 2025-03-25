import { Module } from '@nestjs/common';
import { repositoryProviders } from 'src/providers/asset/repositories.provider';
import { databaseProvider } from 'src/providers/database/database.provider';
import { poolProvider } from 'src/providers/database/pool.provider';

@Module({
  providers: [...databaseProvider, ...poolProvider, ...repositoryProviders],
  exports: [...databaseProvider, ...poolProvider, ...repositoryProviders],
})

export class DatabaseModule {}
