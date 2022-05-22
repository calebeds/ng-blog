export class Article {
    id!: number;
    title: string = '';
    key: string = '';
    date: Date = new Date();
    content: string = '';
    description: string = '';
    imageUrl: string = '';
    viewCount: number = 0;
    published: boolean = false;
}