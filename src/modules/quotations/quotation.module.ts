import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Negotiation, NegotiationSchema } from './schemas/negotiation.schema';
import { Quotation, QuotationSchema } from './schemas/quotation.schema';
import { QuotationController } from './controllers/quotation.controller';
import { NegotiationController } from './controllers/negotiation.controller';
import { QuotationService } from './services/quotation.service';
import { NegotiationService } from './services/negotiation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quotation.name, schema: QuotationSchema },
      { name: Negotiation.name, schema: NegotiationSchema },
    ]),
  ],
  controllers: [QuotationController, NegotiationController],
  providers: [NegotiationService, QuotationService],
})
export class QuotationsModule {}
