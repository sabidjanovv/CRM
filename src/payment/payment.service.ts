// payment.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto'; // UpdatePaymentDto ni import qilish

@Injectable()
export class PaymentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto) {
    return this.prismaService.payments.create({
      data: createPaymentDto,
    });
  }

  async findAll() {
    return this.prismaService.payments.findMany({
      include: { student: true }
    });
  }

  async findOne(id: number) {
    return this.prismaService.payments.findUnique({
      where: { id },
      include: { student: true }
    });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.prismaService.payments.update({
      where: { id },
      data: updatePaymentDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.payments.delete({
      where: { id },
    });
  }
}
