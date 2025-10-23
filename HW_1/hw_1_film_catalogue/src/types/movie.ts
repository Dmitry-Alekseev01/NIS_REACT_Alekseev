export interface Movie{
    id: number,
    title: string,
    year: number,
    posterUrl: string
    isFavourite: boolean
}

export type ViewMode = 'grid' | 'list';
export type Filter = 'all' | 'favourites'