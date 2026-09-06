import type { Core } from '@strapi/strapi';

const allowedMediaTypes = [
  'image/*',
  'video/*',
  'audio/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.*',
  'text/plain',
  'text/csv',
];

const deniedTypes = [
  'image/svg+xml',
  'application/vnd.microsoft.portable-executable',
  'application/x-msdownload',
  'application/x-msdos-program',
  'application/x-executable',
  'application/x-dosexec',
  'application/x-sh',
  'text/x-shellscript',
  'application/x-mach-binary',
];

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'users-permissions': {
    config: {
      jwtManagement: 'refresh',
      sessions: {
        httpOnly: true,
      },
    },
  },
  upload: {
    config: {
      security: {
        allowedTypes: allowedMediaTypes,
        deniedTypes,
      },
      provider: '@avorati/strapi-provider-upload-minio',
      providerOptions: {
        host: env('MINIO_HOST'),
        port: env('MINIO_PORT') ? parseInt(env('MINIO_PORT') as string) : 9000,
        useSSL: env('MINIO_USE_SSL', 'false') === 'true',
        accessKey: env('MINIO_ACCESS_KEY'),
        secretKey: env('MINIO_SECRET_KEY'),
        bucket: env('MINIO_BUCKET', 'strapi'),
        folder: env('MINIO_FOLDER', 'uploads'),

    },
  }},
});

export default config;
