
export interface iInputArtist {
  singers?: singer[];
  onChange(p: singer[]): void;

}
export type singer = {
  id: string;
  ChanalName: string;
  pathImage: string;
};
