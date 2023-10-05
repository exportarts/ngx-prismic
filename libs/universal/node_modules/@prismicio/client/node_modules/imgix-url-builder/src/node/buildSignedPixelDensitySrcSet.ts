import type { BuildPixelDensitySrcSetParams } from "../buildPixelDensitySrcSet";
import { buildSignedURL } from "./buildSignedURL";

/**
 * Builds an `<img>` `srcset` attribute value for a given set of pixel
 * densities. It can also optinally apply Imgix URL API parameters to the URLs.
 * The URLs are signed by appending a signature to their URL parameters. This
 * locks the URLs and their parameters to the signature to prevent URL
 * tampering.
 *
 * The `dpr` URL parameter will be applied for each `srcset` entry. If a `dpr`
 * parameter is provided to the `params` parameter, it will be ignored.
 *
 * **Important**: This function should only be used in a trusted environment and
 * never in a browser. The `secureURLToken` parameter is a secret and should not
 * be exposed to the public.
 *
 * @example
 *
 * ```ts
 * const srcset = buildSignedPixelDensitySrcSet(
 * 	"https://example.imgix.net/image.png",
 * 	"example-token",
 * 	{ pixelDensities: [1, 2, 3] },
 * );
 * // => https://example.imgix.net/image.png?dpr=1&s=def3e221c3f4c4debda091b8e49420ea 1x,
 * //    https://example.imgix.net/image.png?dpr=2&s=f12c7c39333410c10c2930b57116a943 2x,
 * //    https://example.imgix.net/image.png?dpr=3&s=3a975b5087ab7ad2ab91fe66072fd628 3x
 * ```
 *
 * @example
 *
 * ```ts
 * const srcset = buildSignedPixelDensitySrcSet(
 * 	"https://example.imgix.net/image.png",
 * 	"example-token",
 * 	{
 * 		pixelDensities: [1, 2, 3],
 * 		sat: -100,
 * 	},
 * );
 * // => https://example.imgix.net/image.png?dpr=1&sat=-100&s=def3e221c3f4c4debda091b8e49420ea 1x,
 * //    https://example.imgix.net/image.png?dpr=2&sat=-100&s=f12c7c39333410c10c2930b57116a943 2x,
 * //    https://example.imgix.net/image.png?dpr=3&sat=-100&s=3a975b5087ab7ad2ab91fe66072fd628 3x
 * ```
 *
 * @param url - Full absolute URL to the Imgix image.
 * @param secureURLToken - The secret secure URL token for the image's Imgix
 *   source.
 * @param params - An object of Imgix URL API parameters. The `pixelDensities`
 *   parameter defines the resulting `srcset` widths.
 *
 * @returns A `srcset` attribute value for `url` with the given Imgix URL API
 *   parameters applied.
 */
export const buildSignedPixelDensitySrcSet = (
	url: string,
	secureURLToken: string,
	{ pixelDensities, ...params }: BuildPixelDensitySrcSetParams,
): string => {
	return pixelDensities
		.map((dpr) => {
			return `${buildSignedURL(url, secureURLToken, {
				...params,
				dpr,
			})} ${dpr}x`;
		})
		.join(", ");
};
