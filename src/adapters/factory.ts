import { VendorConfig, IVendorAdapter } from './base';
import { JsonAdapter } from './json.adapter';
import { CsvAdapter } from './csv.adapter';
import { RestAdapter } from './rest.adapter';

export function createAdapter(config: VendorConfig): IVendorAdapter {
  switch (config.sourceType) {
    case 'json':
      return new JsonAdapter(config);
    case 'csv':
      return new CsvAdapter(config);
    case 'rest':
      return new RestAdapter(config);
    default:
      throw new Error(`Unsupported source type: ${config.sourceType}`);
  }
}
