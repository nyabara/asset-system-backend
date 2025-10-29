import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';

// ========== ALL SERVICES ==========
import { AssetTransferService } from 'src/services/asset.transfer.services';
import { AssetStatusHistoryService } from 'src/services/asset.status.history.services';
import { AssetMaintenanceService } from 'src/services/asset-maintenance.service';
import { AssetIssueService } from 'src/services/asset.issue.services';
import { AssetAuditLogService } from 'src/services/asset.audit.log.services';
import { AssetAttachmentService } from 'src/services/asset.attachment.services';
import { AssetDisposalService } from 'src/services/asset.disposal.services';
import { DepartmentService } from 'src/services/department.services';

// ========== ALL CONTROLLERS ==========
import { AssetTransferController } from 'src/controllers/asset.transfer.controller';
import { AssetStatusHistoryController } from 'src/controllers/asset.status.history.controller';
import { AssetMaintenanceController } from 'src/controllers/asset.maintenance.controller';
import { AssetIssueController } from 'src/controllers/asset.issue.controller';
import { AssetAuditLogController } from 'src/controllers/asset.audit.log.controller';
import { AssetAttachmentController } from 'src/controllers/asset.attachment.controller';
import { AssetDisposalController } from 'src/controllers/asset.disposal.controller';
import { DepartmentController } from 'src/controllers/department.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    AssetTransferService,
    AssetStatusHistoryService,
    AssetMaintenanceService,
    AssetIssueService,
    AssetAuditLogService,
    AssetAttachmentService,
    AssetDisposalService,
    DepartmentService,
  ],
  controllers: [
    AssetTransferController,
    AssetStatusHistoryController,
    AssetMaintenanceController,
    AssetIssueController,
    AssetAuditLogController,
    AssetAttachmentController,
    AssetDisposalController,
    DepartmentController,
  ],
  exports: [
    AssetTransferService,
    AssetStatusHistoryService,
    AssetMaintenanceService,
    AssetIssueService,
    AssetAuditLogService,
    AssetAttachmentService,
    AssetDisposalService,
    DepartmentService,
  ],
})
export class AssetManagementModule {}