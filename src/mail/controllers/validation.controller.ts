import { Controller, Get, Query } from '@nestjs/common';
import { Public } from '../../auth/decorators/public.decorator';
import { ValidationService } from '../services/validation.service';

@Controller()
export class ValidationController {
  constructor(private mailService: ValidationService) {}

  @Public()
  @Get('/confirmation-email/')
  confir(@Query('token') token: string) {
    return this.mailService.validEmail(token);
  }
}
