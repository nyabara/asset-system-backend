import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AssetModule } from './modules/asset.module';
import { AssetStatusModule } from './modules/asset.status.module';
import { AssetMovementModule } from './modules/assetmovementmodule';
import { CountyModule } from './modules/county.module';
import { LocationModule } from './modules/location.module';
import { SubCountyModule } from './modules/sub.county.module';
import { FundSourceModule } from './modules/asset.fundsource.module';
import { UserModule } from './modules/user.module';
import { CategoryModule } from './modules/asset.category.module';
import { AssetManagementModule } from './modules/asset.management.module'

@Module({
  imports: [AssetModule, AssetStatusModule, AssetMovementModule, CountyModule, SubCountyModule, 
    LocationModule, FundSourceModule, UserModule, CategoryModule, AssetManagementModule],
  providers: [AppService],
})
export class AppModule {}
