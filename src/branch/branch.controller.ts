import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto, UpdateBranchDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Branch')
@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @ApiOperation({ summary: 'Create a new branch' })
  @ApiResponse({
    status: 201,
    description: 'Branch created successfully',
    type: CreateBranchDto,
  })
  @Post()
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchService.create(createBranchDto);
  }

  @ApiOperation({ summary: 'Retrieve all branches' })
  @ApiResponse({
    status: 200,
    description: 'List of branches',
  })
  @Get()
  findAll() {
    return this.branchService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a specific branch by ID' })
  @ApiResponse({
    status: 200,
    description: 'Branch found',
  })
  @ApiResponse({
    status: 404,
    description: 'Branch not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a specific branch by ID' })
  @ApiResponse({
    status: 200,
    description: 'Branch updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Branch not found',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchService.update(+id, updateBranchDto);
  }

  @ApiOperation({ summary: 'Delete a specific branch by ID' })
  @ApiResponse({
    status: 200,
    description: 'Branch removed successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Branch not found',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchService.remove(+id);
  }
}
