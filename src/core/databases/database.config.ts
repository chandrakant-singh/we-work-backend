// src/core/config/database.config.ts
import { ConfigService } from '@nestjs/config';

export const getMongoConfig = (configService: ConfigService) => {
  const host = configService.get<string>('DATABASE_HOST');
  const port = configService.get<string>('DATABASE_PORT');
  const dbName = configService.get<string>('DATABASE_NAME');
  //   const user = configService.get<string>('DATABASE_USER');
  //   const pass = configService.get<string>('DATABASE_PASS');
  console.log(`Connecting to MongoDB at mongodb://${host}:${port}/${dbName}`); // Add this line

  return {
    uri: `mongodb://${host}:${port}/${dbName}`,
  };
};
