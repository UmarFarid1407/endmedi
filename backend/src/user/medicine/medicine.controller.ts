import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MedicineService } from './medicine.service';

import { CreateMedicineDto } from './medicineDTO/create-medicine.dto';
import { UpdateMedicineDto } from './medicineDTO/update-medicine.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { RolesGuard } from '../guards/roles-guard';
import { Roles } from '../decorators/role.decorators';
@Controller('medicines')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('seller')
  @Post('/createmedicine')
  async create(@Body() createMedicineDto: CreateMedicineDto) {
    try {
      if (createMedicineDto.medicinequantityinonetablet) {
        createMedicineDto.medicinequantityinonetablet = Number(
          createMedicineDto.medicinequantityinonetablet,
        );
        if (isNaN(createMedicineDto.medicinequantityinonetablet)) {
          throw new BadRequestException(
            'Invalid value for medicinequantityinonetablet',
          );
        }
      }

      const response = await this.medicineService.create(createMedicineDto);
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('admin', 'pharmacist')
  @Get()
  async findAll() {
    try {
      return await this.medicineService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('seller')
  @Get('/getmedbyid/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.medicineService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('seller')
  @Get('/seller/:sellerID')
  async findAllBySellerID(@Param('sellerID') sellerID: number) {
    try {
      return await this.medicineService.findAllBySellerID(+sellerID);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('seller')
  @Put('/medicineupdate/:id')
  async update(
    @Param('id') id: string,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ) {
    try {
      const response = await this.medicineService.update(
        +id,
        updateMedicineDto,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('seller')
  @Delete('/deletemedicine/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const response = await this.medicineService.remove(+id);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
