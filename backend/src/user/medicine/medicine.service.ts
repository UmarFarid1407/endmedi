import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMedicineDto } from './medicineDTO/create-medicine.dto';
import { UpdateMedicineDto } from './medicineDTO/update-medicine.dto';
@Injectable()
export class MedicineService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMedicineDto: CreateMedicineDto) {
    try {
      const normalizedCreateDto = {
        ...createMedicineDto,
        medicineExpiryDate: new Date(
          createMedicineDto.medicineExpiryDate,
        ).toISOString(),
        medicineManufacturingDate: new Date(
          createMedicineDto.medicineManufacturingDate,
        ).toISOString(),
      };

      const existingMedicine = await this.prisma.medicine.findFirst({
        where: {
          medicineName: createMedicineDto.medicineName,
          sellerID: createMedicineDto.sellerID,
        },
      });

      if (existingMedicine) {
        throw new ConflictException('Medicine already exists');
      }

      await this.prisma.medicine.create({
        data: normalizedCreateDto,
      });

      return { message: 'Medicine added successfully' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error creating medicine: ' + error.message,
      );
    }
  }

  async update(id: number, updateMedicineDto: UpdateMedicineDto) {
    try {
      const normalizedUpdateDto = {
        ...updateMedicineDto,
        medicineExpiryDate: updateMedicineDto.medicineExpiryDate
          ? new Date(updateMedicineDto.medicineExpiryDate).toISOString()
          : undefined,
        medicineManufacturingDate: updateMedicineDto.medicineManufacturingDate
          ? new Date(updateMedicineDto.medicineManufacturingDate).toISOString()
          : undefined,
        medicinequantityinonetablet:
          updateMedicineDto.medicinequantityinonetablet
            ? Number(updateMedicineDto.medicinequantityinonetablet)
            : undefined,
      };

      const medicine = await this.prisma.medicine.findUnique({
        where: { medicineID: id },
      });
      if (!medicine) {
        throw new NotFoundException('Medicine not found');
      }

      await this.prisma.medicine.update({
        where: { medicineID: id },
        data: normalizedUpdateDto,
      });

      return { message: 'Medicine updated successfully' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error updating medicine: ' + error.message,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.medicine.findMany();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error retrieving medicines: ' + error.message,
      );
    }
  }

  async findOne(id: number) {
    try {
      const medicine = await this.prisma.medicine.findUnique({
        where: { medicineID: id },
      });
      if (!medicine) {
        throw new NotFoundException('Medicine not found');
      }
      return medicine;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error retrieving medicine: ' + error.message,
      );
    }
  }
  // used by seller
  async remove(id: number) {
    console.log(id);
    try {
      const medicine = await this.prisma.medicine.findUnique({
        where: { medicineID: id },
      });
      console.log(medicine);
      if (!medicine) {
        throw new NotFoundException('Medicine not found');
      }

      await this.prisma.medicine.delete({
        where: { medicineID: id },
      });
      return { message: 'Medicine deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  async findAllBySellerID(sellerID: number) {
    try {
      const medicines = await this.prisma.medicine.findMany({
        where: { sellerID },
      });

      if (!medicines.length) {
        return { message: 'No medicines found for this seller', data: [] };
      }

      return { message: 'Medicines retrieved successfully', data: medicines };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error retrieving medicines for seller: ' + error.message,
      );
    }
  }

  async updateQuantity(medicineID: number, amount: number): Promise<void> {
    try {
      const medicine = await this.prisma.medicine.findUnique({
        where: { medicineID },
      });

      if (!medicine) {
        throw new NotFoundException('Medicine not found');
      }
      console.log('from update');

      await this.prisma.medicine.update({
        where: { medicineID },
        data: {
          medicineQuantity: medicine.medicineQuantity - amount,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error updating medicine quantity: ' + error.message,
      );
    }
  }
}
