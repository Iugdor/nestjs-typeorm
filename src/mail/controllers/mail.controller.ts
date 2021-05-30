import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Public } from '../../auth/decorators/public.decorator';
import { MailService } from '../services/mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}
  @Public()
  @Get('/confirmation/:userId')
  getOne(@Param('userId', ParseIntPipe) id: number) {
    return this.mailService.sendUserConfirmation(id);
  }
}
