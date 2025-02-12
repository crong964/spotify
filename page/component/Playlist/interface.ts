import React from "react";

export interface iPlayList extends React.AllHTMLAttributes<HTMLDivElement> {
    id: string;
    Genre_ID: string;
    ImagePath: string;
    PlayListName: string;
    Type: string;
    className?: string;
    click?(id: string): void
}

export interface iPlayLists {
    d: iPlayList[];
    title: string;
    link?: string; className?: string;
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