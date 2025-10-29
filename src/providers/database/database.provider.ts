import { DataSource } from "typeorm";
import { env } from "src/common/env";
import { User } from "src/entities/user.entity";
import { AssetStatus } from "src/entities/asset_status.entity";
import { County } from "src/entities/county.entity";
import { SubCounty } from "src/entities/sub_county.entity";
import { Location } from "src/entities/location.entity";
import { FundSource } from "src/entities/fund_source.entity";
import { Category } from "src/entities/asset_category.entity";
import { Asset } from "src/entities/asset.entity";
//import { AssetImage } from "src/entities/asset_image.entity";
import { AssetMovement } from "src/entities/asset_movement.entity";

// ========== NEW ENTITIES - Import them ==========
import { AssetTransfer } from "src/entities/asset_transfers.entity";
import { AssetStatusHistory } from "src/entities/asset_status_history.entity";
import { AssetMaintenance } from "src/entities/asset_maintenance.entity";
import { AssetIssue } from "src/entities/asset_issues.entity";
import { AssetAuditLog } from "src/entities/asset_audit_log.entity";
import { AssetAttachment } from "src/entities/asset_attachments.entity";
import { AssetDisposal } from "src/entities/asset_disposals.entity";
import { Department } from "src/entities/departments.entity";



// export const databaseProvider = [
//     {
//         provide: 'DATA_SOURCE',
//         useFactory: async () => {
//             const dataSource = new DataSource({
//                 type: 'postgres',
//                 host: env.AZURE_POSTGRESQL_HOST,
//                 port: Number(env.AZURE_POSTGRESQL_PORT) || 5432,
//                 username: env.AZURE_POSTGRESQL_USER,
//                 password: env.AZURE_POSTGRESQL_PASSWORD,
//                 database: env.AZURE_POSTGRESQL_DATABASE,
//                 ssl: env.AZURE_POSTGRESQL_SSL === "true" ? { rejectUnauthorized: false } : false,
//                 entities: [
//                     User,
//                     AssetStatus,
//                     County,
//                     SubCounty,
//                     Location,
//                     FundSource,
//                     AssetCategory,
//                     Asset,
//                     AssetImage,
//                     AssetMovement
//                 ],
//                 synchronize: true, // Set to false in production
//                 logging: true,
//             });
//             return dataSource.initialize();
//         },
//     },
// ];


export const databaseProvider = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: env.POSTGRES_HOST,
                port: Number(env.POSTGRES_PORT) || 5432,
                username: env.POSTGRES_USER,
                password: env.POSTGRES_PASSWORD,
                database: env.POSTGRES_DB,
                ssl: env.POSTGRES_SSL === "true" ? { rejectUnauthorized: false } : false,
                entities: [
                    User,
                    AssetStatus,
                    County,
                    SubCounty,
                    Location,
                    FundSource,
                    Category,
                    Asset,
                    AssetMovement,
                    // ========== NEW ENTITIES - Add them here ==========
                    AssetTransfer,
                    AssetStatusHistory,
                    AssetMaintenance,
                    AssetIssue,
                    AssetAuditLog,
                    AssetAttachment,
                    AssetDisposal,
                    Department
                ],
                synchronize: true, // Set to false in production
                logging: true,
            });
            return dataSource.initialize();
        },
    },
];
