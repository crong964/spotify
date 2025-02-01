export interface iPlayList {
    id: string;
    Genre_ID: string;
    ImagePath: string;
    PlayListName: string;
    Type: string;
    className?: string;
}

export interface iPlayLists {
    d: iPlayList[];
    title: string;
    link?: string;
}

export interface iPopEditPlaylis extends PlaylistForm {
    onChange(v: PlaylistForm): void
    onShow(v: boolean): void
}
export interface PlaylistForm {
    PlayListName: string;
    id: string;
    ImagePath: string;
    Discripition: string;
}