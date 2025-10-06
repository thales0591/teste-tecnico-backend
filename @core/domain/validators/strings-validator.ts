import { z } from 'zod';
import { DomainException } from '../exceptions/domain-exception';

export class StringValidator {
  static isUUIDOrThrows(field: string, value: string): void {
    const schema = z.uuid();
    const result = schema.safeParse(value);

    if (!result.success) {
      throw new DomainException(`${field} is not a valid UUID`);
    }
  }
}
