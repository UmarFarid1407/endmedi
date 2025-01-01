import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {}

  async saveFile(filename: string, fileData: Buffer, userId: number) {
    return this.prisma.fileMetadata.create({
      data: {
        filename,
        fileData,
        userId,
      },
    });
  }

  async getFiles() {
    return this.prisma.fileMetadata.findMany({
      select: {
        id: true,
        filename: true,
        createdAt: true,
      },
    });
  }

  async getFilesByUserId(userId: number) {
    return this.prisma.fileMetadata.findFirst({
      where: { userId },
      select: {
        id: true,
        filename: true,
        createdAt: true,
      },
    });
  }

  async getFileById(id: number) {
    return this.prisma.fileMetadata.findUnique({
      where: { id },
      select: {
        id: true,
        filename: true,
        fileData: true,
      },
    });
  }

  async getFileByUserId(userId: number) {
    return this.prisma.fileMetadata.findFirstOrThrow({
      where: { userId },
      select: {
        id: true,
        filename: true,
        fileData: true,
      },
    });
  }

  async updateFile(id: number, filename: string, fileData: Buffer) {
    return this.prisma.fileMetadata.update({
      where: { id },
      data: {
        filename,
        fileData,
      },
    });
  }
}
