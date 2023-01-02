import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError, map } from 'rxjs';
import { AxiosResponse, AxiosError } from 'axios';

@Injectable()
export class CryptosService {
  private readonly url =
    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=200&convert=USD';

  private readonly logger = new Logger(CryptosService.name);

  constructor(private readonly httpService: HttpService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCryptos(): Observable<AxiosResponse<any>> {
    return this.httpService
      .get(this.url, {
        headers: {
          'X-CMC_PRO_API_KEY': 'f7298201-21c0-489e-a014-33e8d5061c0b',
        },
      })
      .pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      )
      .pipe(map((x) => x?.data));
  }
}
