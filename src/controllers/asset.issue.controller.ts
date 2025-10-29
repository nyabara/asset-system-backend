// ========================================
// asset-issue.controller.ts
// ========================================
import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { AssetIssueService} from 'src/services/asset.issue.services';
import { ReportIssueDto, UpdateIssueDto } from 'src/dtos/issue-reporting-asset-dto'

@Controller('asset-issues')
export class AssetIssueController {
  constructor(
    private readonly issueService: AssetIssueService,
  ) {}

  @Post('report')
  async reportIssue(@Body() dto: ReportIssueDto) {
    return this.issueService.reportIssue(dto);
  }

  @Put(':id')
  async updateIssue(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateIssueDto
  ) {
    return this.issueService.updateIssue(id, dto);
  }

  @Get('asset/:assetId')
  async getAssetIssues(@Param('assetId', ParseIntPipe) assetId: number) {
    return this.issueService.getAssetIssues(assetId);
  }

  @Get('open')
  async getOpenIssues() {
    return this.issueService.getOpenIssues();
  }

  @Get()
  async findAll() {
    return this.issueService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.issueService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.issueService.remove(id);
  }
}