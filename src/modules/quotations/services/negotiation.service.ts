import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Negotiation } from '../schemas/negotiation.schema';
import { Model } from 'mongoose';
import { NegotiationDto } from '../dtos/negotiation.dto';

@Injectable()
export class NegotiationService {
  constructor(
    @InjectModel(Negotiation.name)
    private readonly negotiationModel: Model<Negotiation>,
  ) {}

  async negotiate(negotiationReq: NegotiationDto) {
    const { quotationId, userId, offer, by } = negotiationReq;
    const negotiation = await this.negotiationModel.findOne({ quotationId });

    if (!negotiation) {
      // Create a new negotiation
      const newNegotiation = new this.negotiationModel({
        quotationId,
        userId,
        offers: [{ offer, by, timestamp: new Date() }],
      });
      return newNegotiation.save();
    }

    // Update existing negotiation
    negotiation.offers.push({ offer, by, timestamp: new Date() });
    return negotiation.save();
  }

  async findOne(id: string): Promise<Negotiation> {
    const response = await this.negotiationModel.findById(id).exec();
    if (!response)
      throw new NotFoundException(`Negotiation with ID ${id} not found`);
    return response;
  }
}
