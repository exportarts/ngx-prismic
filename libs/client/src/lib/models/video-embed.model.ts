export interface VideoEmbed {
    height: number;
    width: number;
    embed_url: string;
    type: 'video',
    version: string;
    title: string;
    author_name: string;
    author_url: string;
    provider_name: string;
    provider_url: string;
    cache_age: any,
    thumbnail_url: string;
    thumbnail_width: number;
    thumbnail_height: number;
    html: string;
}
