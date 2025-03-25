import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetModule } from './modules/asset.module';
import { AssetStatusModule } from './modules/asset.status.module';
import { AssetMovementModule } from './modules/assetmovementmodule';
import { CountyModule } from './modules/county.module';
import { LocationModule } from './modules/location.module';
import { SubCountyModule } from './modules/sub.county.module';
import { AssetImageModule } from './modules/asset.image.module';
import { FundSourceModule } from './modules/asset.fundsource.module';
import { UserModule } from './modules/user.module';
import { CategoryModule } from './modules/asset.category.module';

@Module({
  imports: [AssetModule, AssetStatusModule, AssetMovementModule, CountyModule, SubCountyModule, 
    LocationModule, AssetImageModule, FundSourceModule, UserModule, CategoryModule],
  //controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
