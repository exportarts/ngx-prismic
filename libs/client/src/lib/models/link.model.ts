/**
 * Represents a link to a media item or document.
 */
export interface BaseLink {
    link_type: string;
}

/**
 * @deprecated use `MediaLink` instead
 */
export interface Link extends BaseLink {
    kind: string;
    name: string;
    size: string;
    url: string;
    height?: number;
    width?: number;
}
export type MediaLink = Link;

export interface ContentRelationship extends Link {
    id: string;
    type: string;
    tags: string[];
    slug: string;
    lang: string;
    uid: string;
    isBroken: boolean;
}
/**
 * @deprecated use `ContentRelationship` instead
 */
export type LinkedDocument = ContentRelationship;
