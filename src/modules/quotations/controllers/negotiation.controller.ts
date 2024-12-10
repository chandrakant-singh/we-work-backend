import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NegotiationDto } from '../dtos/negotiation.dto';
import { NegotiationService } from '../services/negotiation.service';

@Controller('negotiations')
export class NegotiationController {
  constructor(private readonly negotiationService: NegotiationService) {}

  // Endpoint to create a negotiation
  @Post()
  async createNegotiation(@Body() negotiationDto: NegotiationDto) {
    return this.negotiationService.negotiate(negotiationDto);
  }

  @Get(':quotationId')
  async getNegotiationsByQuotation(@Param('quotationId') quotationId: string) {
    return this.negotiationService.findOne(quotationId);
  }
}
