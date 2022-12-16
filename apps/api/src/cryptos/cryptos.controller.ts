import { Controller, Get } from '@nestjs/common';
import { CryptosService } from './cryptos.service';

@Controller('cryptos')
export class CryptosController {
  constructor(private readonly cryptosService: CryptosService) {}

  @Get()
  getAllCryptos() {
    return this.cryptosService.getCryptos();
  }
}
