import { createClient, getEndpoint } from '@prismicio/client';

export const environment = {
  production: true,
  prismic: {
    client: createClient(getEndpoint('ngx-prismic-demo'))
  }
};
