import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './core/databases/database.config';
import { UserModule } from './modules/user/user.module';
import { AddressModule } from './modules/address/address.module';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { AuthModule } from './core/auth/auth.module';
import { ServiceGroupModule } from './modules/service-group/service-group.module';
import { ServiceCategoryModule } from './modules/service-category/service-category.module';
import { ServiceSubCategoryModule } from './modules/service-sub-category/service-sub-category.module';
import { ServiceModule } from './modules/service/service.module';
import { ServiceAttributesModule } from './modules/service-attributes/service-attributes.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/order/orders.module';
import mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    UserModule,
    AddressModule,
    UserProfileModule,
    AuthModule,
    ServiceGroupModule,
    ServiceCategoryModule,
    ServiceSubCategoryModule,
    ServiceModule,
    ServiceAttributesModule,
    CartModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  onModuleInit() {
    mongoose.connection.on('connected', () => {
      this.logger.log('✅ Database connected successfully');
    });

    mongoose.connection.on('error', (err) => {
      this.logger.error('❌ Database connection error:', err);
    });
  }
}
