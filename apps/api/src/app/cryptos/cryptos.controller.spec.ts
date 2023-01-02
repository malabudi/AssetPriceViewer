import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { CryptosController } from './cryptos.controller';
import { CryptosService } from './cryptos.service';

describe('CryptosController', () => {
  let cryptosController: CryptosController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [CryptosController],
      providers: [
        CryptosService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        }
      ],
    }).compile();

    cryptosController = app.get<CryptosController>(CryptosController);
    
    jest.resetAllMocks();
  });

  describe('Get', () => {
    it('should call CoinMarketCap API', () => {
      jest.spyOn(cryptosController, 'getAllCryptos');

      expect(cryptosController.getAllCryptos()).toBeCalled();
    });
  });
});
