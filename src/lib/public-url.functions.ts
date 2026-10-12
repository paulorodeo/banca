import { createServerFn } from '@tanstack/react-start';
import { publicOrigin } from './public-url';
export const readPublicOrigin = createServerFn({ method: 'GET' }).handler(() => publicOrigin(process.env['PUBLIC_SITE_URL']));
