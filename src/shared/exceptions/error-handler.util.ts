import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export class ErrorHandlerUtil {
  static handle(error: any): never {
    // Check for validation errors
    if (error.name === 'ValidationError') {
      throw new BadRequestException(error.message); // Map to 400 error
    }

    // Check for MongoDB E11000 Duplicate Key Error
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0]; // Extract the duplicate field
      const duplicateValue = error.keyValue[duplicateField];
      throw new ConflictException(
        `Duplicate value detected: ${duplicateField} '${duplicateValue}' already exists.`,
      );
    }

    // Fallback for unhandled errors
    throw new InternalServerErrorException(
      error.message || 'An unexpected error occurred.',
    );
  }
}
