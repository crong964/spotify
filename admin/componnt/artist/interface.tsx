
export interface iInputArtist {
  value?: string;
  onChange(p: singer[]): void;

}
export type singer = {
  id: string;
  ChanalName: string;
  pathImage: string;
};
