import { DataSource } from "typeorm";
import { env } from "src/common/env";
import { User } from "src/entities/user.entity";
import { AssetStatus } from "src/entities/asset_status.entity";
import { County } from "src/entities/county.entity";
import { SubCounty } from "src/entities/sub_county.entity";
import { Location } from "src/entities/location.entity";
import { FundSource } from "src/entities/fund_source.entity";
import { AssetCategory } from "src/entities/asset_category.entity";
import { Asset } from "src/entities/asset.entity";
import { AssetImage } from "src/entities/asset_image.entity";
import { AssetMovement } from "src/entities/asset_movement.entity";

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
                    AssetCategory,
                    Asset,
                    AssetImage,
                    AssetMovement
                ],
                synchronize: true, // Set to false in production
                logging: true,
            });
            return dataSource.initialize();
        },
    },
];
