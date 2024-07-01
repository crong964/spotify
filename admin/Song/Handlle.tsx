import { useEffect, useState } from "react";
import { post } from "../../page/config/req";
type singer = {
  id: string;
  ChanalName: string;
  pathImage: string;
};
export default function useSelectedArtist() {
  const [singers, Setsingers] = useState<singer[]>([]);
  const [SelectedSingers, SetSelectedSingers] = useState<singer[]>([]);
  const [p, SetP] = useState("");

  useEffect(() => {
    post("/search/NameArtist", { name: p }, (v: any) => {
      if (v && v.err != undefined && !v.err) {
        Setsingers(v.ls);
      }
    });
  }, [p]);
  return { singers, SelectedSingers, SetSelectedSingers, SetP, Setsingers };
}
