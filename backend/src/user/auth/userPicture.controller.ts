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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './userpicture.service';
import { Response } from 'express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    try {
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

      return {
        message: 'File uploaded and saved to the database successfully!',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getFiles() {
    try {
      const files = await this.uploadService.getFiles();

      return files.map((file) => ({
        ...file,
        fileData: undefined,
      }));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/userimage/:userId')
  async getOneFiles(@Param('userId', ParseIntPipe) userId: number) {
    try {
      const files = await this.uploadService.getFilesByUserId(userId);

      return {
        ...files,
        fileData: undefined,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getFileById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    try {
      const file = await this.uploadService.getFileById(id);

      if (!file) {
        return res.status(404).json({ message: 'File not found' });
      }

      res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${file.filename}"`,
      });

      return res.send(file.fileData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/image/:userId')
  async getFileByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Res() res: Response,
  ) {
    try {
      const file = await this.uploadService.getFileByUserId(userId);

      if (!file) {
        return res.status(404).json({ message: 'File not found' });
      }

      res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${file.filename}"`,
      });

      return res.send(file.fileData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/edit/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateFile(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (!file) {
        throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
      }

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
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
