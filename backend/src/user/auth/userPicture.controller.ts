import {
  Controller,
  Post,
  Get,
  Param,
  Res,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './userpicture.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { RolesGuard } from '../guards/roles-guard';
import { Roles } from '../decorators/role.decorators';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    if (!userId) {
      throw new HttpException(
        'User not authenticated',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const fileData = file.buffer;
    const filename = file.originalname; 
    await this.uploadService.saveFile(filename, fileData, userId);

    return { message: 'File uploaded and saved to the database successfully!' };
  }

  @Get()
  async getFiles() {
    const files = await this.uploadService.getFiles();
    
    return files.map((file) => ({
      ...file,
      fileData: undefined,
    }));
  }

  // `@UseGuards(JwtAuthGuard)
  // @UseGuards(RolesGuard)
  // @Roles('user', 'seller', 'pharmacist', 'admin')`
  @Get('/userimage/:userId')
  async getOneFiles(@Param('userId', ParseIntPipe) userId: number) {
    const files = await this.uploadService.getFilesByUserId(userId);
  
    return {
      ...files,
      fileData: undefined,
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(RolesGuard)
  // @Roles('user', 'seller', 'pharmacist', 'admin')
  @Get(':id')
  async getFileById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const file = await this.uploadService.getFileById(id);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${file.filename}"`,
    });

    return res.send(file.fileData);
  }

  @Get('/image/:userId')
  async getFileByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Res() res: Response,
  ) {
    const file = await this.uploadService.getFileByUserId(userId);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${file.filename}"`,
    });

    return res.send(file.fileData);
  }

  @Put('/edit/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateFile(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    console.log('from edit ');
    const fileData = file.buffer;
    const filename = file.originalname; 

    const updatedFile = await this.uploadService.updateFile(
      id,
      filename,
      fileData,
    );

    if (!updatedFile) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }

    return { message: 'File updated successfully!' };
  }
}
