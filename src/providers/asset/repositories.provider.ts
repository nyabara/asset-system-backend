import { DataSource } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Asset } from 'src/entities/asset.entity';
import { Category } from 'src/entities/asset_category.entity';
import { AssetMovement } from 'src/entities/asset_movement.entity';
import { AssetStatus } from 'src/entities/asset_status.entity';
import { County } from 'src/entities/county.entity';
import { SubCounty } from 'src/entities/sub_county.entity';
import { Location } from 'src/entities/location.entity';
import { FundSource } from 'src/entities/fund_source.entity';

// ========== NEW ENTITIES - Import them ==========
import { AssetTransfer } from 'src/entities/asset_transfers.entity';
import { AssetStatusHistory } from 'src/entities/asset_status_history.entity';
import { AssetMaintenance } from 'src/entities/asset_maintenance.entity';
import { AssetIssue } from 'src/entities/asset_issues.entity';
import { AssetAuditLog } from 'src/entities/asset_audit_log.entity';
import { AssetAttachment } from 'src/entities/asset_attachments.entity';
import { AssetDisposal } from 'src/entities/asset_disposals.entity';
import { Department } from 'src/entities/departments.entity';

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

    // ========== NEW REPOSITORIES ==========
  {
    provide: 'ASSET_TRANSFER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AssetTransfer),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ASSET_STATUS_HISTORY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AssetStatusHistory),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ASSET_MAINTENANCE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AssetMaintenance),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ASSET_ISSUE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AssetIssue),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ASSET_AUDIT_LOG_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AssetAuditLog),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ASSET_ATTACHMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AssetAttachment),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ASSET_DISPOSAL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AssetDisposal),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'DEPARTMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Department),
    inject: ['DATA_SOURCE'],
  },
];
