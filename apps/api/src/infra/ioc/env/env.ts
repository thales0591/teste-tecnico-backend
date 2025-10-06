import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string(),
  JWT_TOKEN_EXPIRATION_SECONDS: z.coerce.number().positive(),
  QUEUE_HOST: z.string(),
  QUEUE_PORT: z.coerce.number().int().positive(),
  LOCAL_STORAGE_PATH: z.string(),
  ELASTICSEARCH_URL: z.url(),
  AWS_UPLOAD_URL: z.url(),
  AWS_BUCKET_NAME: z.string(),
  AWS_REGION: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY_ID: z.string(),
  AWS_FORCE_PATH_STYLE: z.coerce.boolean().default(false),
});
export type Env = z.infer<typeof envSchema>;
