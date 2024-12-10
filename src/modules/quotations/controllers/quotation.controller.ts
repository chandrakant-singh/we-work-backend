import { Controller, Get, Param, Patch } from '@nestjs/common';
import { Body, Post } from '@nestjs/common';
import { CreateQuotationDto } from '../dtos/quotation.dto';
import { QuotationService } from '../services/quotation.service';

@Controller('quotations')
export class QuotationController {
  constructor(private readonly quotationService: QuotationService) {}

  @Post()
  async requestQuotation(@Body() createQuotationDto: CreateQuotationDto) {
    return this.quotationService.createQuotation(createQuotationDto);
  }

  @Patch('finalize/:quotationId')
  async finalizeQuotation(
    @Param() quotationId: string,
    @Body() body: { finalAmount: number },
  ) {
    return this.quotationService.finalizeQuotation(
      quotationId,
      body.finalAmount,
    );
  }

  @Get(':quotationId')
  async getNegotiationsByQuotation(@Param('quotationId') quotationId: string) {
    return this.quotationService.findOne(quotationId);
  }
}
