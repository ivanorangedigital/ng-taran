export interface CategoryInterface {
    name: string;
    id: string;
    image: null | { src: string };
    parent: null | string;
    sub: any
}