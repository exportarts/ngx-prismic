import { Client } from '@prismicio/client';
import { LinkResolverFunction } from '@prismicio/helpers';

/**
 * Call this function in your `AppComponent`'s `ngOnInit()`.
 */
export async function handlePreview(
  client: Client,
  repoName: string,
  linkResolver: LinkResolverFunction = doc => `/${doc.uid}`,
  defaultURL = '/',
  enabled = true
): Promise<void> {
  if (!enabled) {
    const toolbarScript = document.createElement('script');
    toolbarScript.setAttribute('async', 'async');
    toolbarScript.setAttribute('defer', 'defer');
    toolbarScript.setAttribute('src', `https://static.cdn.prismic.io/prismic.js?new=true&repo=${repoName}`);
    const body = document.getElementsByTagName('body').item(0);
    body?.appendChild(toolbarScript);
  }

  const isManualRef = ((client as any)?.refState?.mode || '').toLowerCase() === 'manual';
  if (isManualRef) {
    client.resolvePreviewURL({
      defaultURL,
      linkResolver
    }).then(url => {
      if (location.pathname !== url && url !== defaultURL) {
        location.replace(url);
      }
    });
  }
}
