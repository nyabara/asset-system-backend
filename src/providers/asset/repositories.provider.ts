import { DataSource } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Asset } from 'src/entities/asset.entity';
import { Category } from 'src/entities/asset_category.entity';
//import { AssetImage } from 'src/entities/asset_image.entity';
import { AssetMovement } from 'src/entities/asset_movement.entity';
import { AssetStatus } from 'src/entities/asset_status.entity';
import { County } from 'src/entities/county.entity';
import { SubCounty } from 'src/entities/sub_county.entity';
import { Location } from 'src/entities/location.entity';
import { FundSource } from 'src/entities/fund_source.entity';

export const repositoryProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ASSET_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Asset),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ASSET_CATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: ['DATA_SOURCE'],
  },
  // {
  //   provide: 'ASSET_IMAGE_REPOSITORY',
  //   useFactory: (dataSource: DataSource) => dataSource.getRepository(AssetImage),
  //   inject: ['DATA_SOURCE'],
  // },
  {
    provide: 'ASSET_MOVEMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AssetMovement),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ASSET_STATUS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AssetStatus),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'COUNTY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(County),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SUB_COUNTY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SubCounty),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'LOCATION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Location),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'FUND_SOURCE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(FundSource),
    inject: ['DATA_SOURCE'],
  },
];
