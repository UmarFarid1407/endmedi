import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {}

  async saveFile(filename: string, fileData: Buffer, userId: number) {
    try {
      return this.prisma.fileMetadata.create({
        data: {
          filename,
          fileData,
          userId,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getFiles() {
    try {
      return this.prisma.fileMetadata.findMany({
        select: {
          id: true,
          filename: true,
          createdAt: true,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getFilesByUserId(userId: number) {
    try {
      return this.prisma.fileMetadata.findFirst({
        where: { userId },
        select: {
          id: true,
          filename: true,
          createdAt: true,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getFileById(id: number) {
    try {
      return this.prisma.fileMetadata.findUnique({
        where: { id },
        select: {
          id: true,
          filename: true,
          fileData: true,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getFileByUserId(userId: number) {
    try {
      return this.prisma.fileMetadata.findFirstOrThrow({
        where: { userId },
        select: {
          id: true,
          filename: true,
          fileData: true,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateFile(id: number, filename: string, fileData: Buffer) {
    try {
      return this.prisma.fileMetadata.update({
        where: { id },
        data: {
          filename,
          fileData,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
