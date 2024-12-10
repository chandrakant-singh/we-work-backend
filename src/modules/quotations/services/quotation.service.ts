import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuotationDto } from '../dtos/quotation.dto';
import { Quotation, QuotationStatus } from '../schemas/quotation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class QuotationService {
  constructor(
    @InjectModel(Quotation.name) private quotationModel: Model<Quotation>,
  ) {}

  async createQuotation(
    createQuotationDto: CreateQuotationDto,
  ): Promise<Quotation> {
    const { userId, items } = createQuotationDto;

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const quotation = new this.quotationModel({
      userId,
      items,
      totalAmount,
      status: QuotationStatus.PENDING,
    });

    return quotation.save();
  }

  async finalizeQuotation(quotationId: string, finalAmount: number) {
    const quotation = await this.quotationModel.findById(quotationId);

    if (!quotation) {
      throw new NotFoundException('Quotation not found');
    }

    if (quotation.status !== QuotationStatus.NEGOTIATING) {
      throw new BadRequestException('Quotation is not in negotiating status');
    }

    quotation.finalAmount = finalAmount;
    quotation.status = QuotationStatus.APPROVED;

    return quotation.save();
  }

  async findOne(id: string): Promise<Quotation> {
    const response = await this.quotationModel.findById(id).exec();
    if (!response)
      throw new NotFoundException(`Negotiation with ID ${id} not found`);
    return response;
  }
}
