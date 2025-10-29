import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AssetIssue } from 'src/entities/asset_issues.entity';
import { Asset } from 'src/entities/asset.entity';
import { ReportIssueDto, UpdateIssueDto } from 'src/dtos/issue-reporting-asset-dto'

// export class ReportIssueDto {
//   assetId: number;
//   issueType: 'Damage' | 'Malfunction' | 'Lost' | 'Theft' | 'Other';
//   severity: 'Low' | 'Medium' | 'High' | 'Critical';
//   description: string;
//   reportedBy?: string;
// }

// export class UpdateIssueDto {
//   status?: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
//   resolution?: string;
//   resolvedBy?: string;
// }

@Injectable()
export class AssetIssueService {
  constructor(
    @Inject('ASSET_ISSUE_REPOSITORY')
    private readonly issueRepository: Repository<AssetIssue>,
    @Inject('ASSET_REPOSITORY')
    private readonly assetRepository: Repository<Asset>,
  ) {}

  /**
   * Report an issue
   */
  async reportIssue(dto: ReportIssueDto): Promise<any> {
    const asset = await this.assetRepository.findOne({ 
      where: { id: dto.assetId } 
    });

    if (!asset) {
      throw new NotFoundException(`Asset with ID ${dto.assetId} not found`);
    }

    const issue = this.issueRepository.create({
      assetId: dto.assetId,
      issueType: dto.issueType,
      severity: dto.severity,
      description: dto.description,
      reportedBy: dto.reportedBy,
      status: 'Open'
    });

    const saved = await this.issueRepository.save(issue);

    return {
      success: true,
      message: 'Issue reported successfully',
      issue: {
        id: saved.id,
        assetId: saved.assetId,
        issueType: saved.issueType,
        severity: saved.severity,
        status: saved.status,
        reportedDate: saved.reportedDate
      }
    };
  }

  /**
   * Update issue
   */
  async updateIssue(id: number, dto: UpdateIssueDto): Promise<any> {
    const issue = await this.issueRepository.findOne({ 
      where: { id } 
    });

    if (!issue) {
      throw new NotFoundException(`Issue with ID ${id} not found`);
    }

    const updateData: any = { ...dto };
    
    // If marking as resolved, set resolvedDate
    if (dto.status === 'Resolved' || dto.status === 'Closed') {
      updateData.resolvedDate = new Date();
    }

    await this.issueRepository.update(id, updateData);

    return {
      success: true,
      message: 'Issue updated successfully'
    };
  }

  /**
   * Get issues for an asset
   */
  async getAssetIssues(assetId: number): Promise<any> {
    const issues = await this.issueRepository.find({
      where: { assetId },
      relations: ['asset'],
      order: { reportedDate: 'DESC' }
    });

    return {
      success: true,
      assetId,
      total: issues.length,
      issues
    };
  }

  /**
   * Get all open issues
   */
  async getOpenIssues(): Promise<any> {
    const openIssues = await this.issueRepository.find({
      where: { status: 'Open' },
      relations: ['asset'],
      order: { reportedDate: 'DESC' }
    });

    return {
      success: true,
      count: openIssues.length,
      issues: openIssues
    };
  }

  /**
   * Get all issues
   */
  async findAll(): Promise<AssetIssue[]> {
    return this.issueRepository.find({
      relations: ['asset'],
      order: { reportedDate: 'DESC' }
    });
  }

  /**
   * Get single issue
   */
  async findOne(id: number): Promise<AssetIssue> {
    const issue = await this.issueRepository.findOne({ 
      where: { id },
      relations: ['asset']
    });

    if (!issue) {
      throw new NotFoundException(`Issue with ID ${id} not found`);
    }

    return issue;
  }

  /**
   * Delete issue
   */
  async remove(id: number): Promise<void> {
    const result = await this.issueRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Issue with ID ${id} not found`);
    }
  }
}