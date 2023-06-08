export interface CategoryInterface {
    name: string;
    id: string;
    image: null | { src: string };
    parent: null | CategoryInterface;
    sub: undefined | CategoryInterface[];
    position: number | null;
    hybrid: boolean | undefined;
}