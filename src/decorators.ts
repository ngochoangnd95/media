import { ZodSchema } from 'zod';

export function Validate(schema: ZodSchema) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      try {
        const parsedParams = schema.parse(args[0]);
        return originalMethod.apply(this, [parsedParams, ...args.slice(1)]);
      } catch (error) {
        throw error;
      }
    };

    return descriptor;
  };
}
