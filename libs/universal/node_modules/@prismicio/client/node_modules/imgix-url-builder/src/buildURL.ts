import type { ImgixURLParams } from "./types.generated";

/**
 * Converts a camel case string to a param case string.
 *
 * @example
 *
 * ```ts
 * camelCaseToParamCase("fooBar");
 * // => 'foo-bar'
 * ```
 *
 * @param input - Camel case string to convert.
 *
 * @returns Param case version of `input`.
 */
const camelCaseToParamCase = (input: string): string => {
	return input.replace(/[A-Z]/g, (match) => {
		return `-${match.toLowerCase()}`;
	});
};

/**
 * Builds a URL to an Imgix image with Imgix URL API parameters.
 *
 * The given URL must be a full absolute URL containing the protocol and domain.
 *
 * URL parameters already applied to the image will be retained. To remove
 * existing parameters, set the parameter to `undefined` in the `params`
 * argument.
 *
 * @example
 *
 * ```ts
 * const url = buildURL("https://example.imgix.net/image.png", {
 * 	width: 400,
 * });
 * // => https://example.imgix.net/image.png?width=400
 * ```
 *
 * @example
 *
 * ```ts
 * const url = buildURL("https://example.imgix.net/image.png?width=400", {
 * 	height: 300,
 * });
 * // => https://example.imgix.net/image.png?width=400&height=300
 * ```
 *
 * @param url - Full absolute URL to the Imgix image.
 * @param params - An object of Imgix URL API parameters.
 *
 * @returns `url` with the given Imgix URL API parameters applied.
 *
 * @see Imgix URL API reference: https://docs.imgix.com/apis/rendering
 */
export const buildURL = (url: string, params: ImgixURLParams): string => {
	const instance = new URL(url);

	for (const camelCasedParamKey in params) {
		const paramKey = camelCaseToParamCase(camelCasedParamKey);
		const paramValue = params[camelCasedParamKey as keyof typeof params];

		if (paramValue === undefined) {
			instance.searchParams.delete(paramKey);
		} else if (Array.isArray(paramValue)) {
			instance.searchParams.set(paramKey, paramValue.join(","));
		} else {
			instance.searchParams.set(paramKey, `${paramValue}`);
		}
	}

	// Ensure the `s` parameter is the last parameter, if it exists.
	// @see https://github.com/imgix/imgix-blueprint#securing-urls
	const s = instance.searchParams.get("s");
	if (s) {
		instance.searchParams.delete("s");
		instance.searchParams.append("s", s);
	}

	return instance.toString();
};
