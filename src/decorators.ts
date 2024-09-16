import { ZodSchema } from 'zod';

export function Validate(schema: ZodSchema) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor.value = function (...args: any[]) {
      const parsedParams = schema.parse(args[0]);
      return originalMethod.apply(this, [parsedParams, ...args.slice(1)]);
    };

    return descriptor;
  };
}
