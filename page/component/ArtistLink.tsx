import React from "react";
import { Link } from "react-router-dom";

type tArtistLink = {
  idArtist: string;
  nameArtist: string;
};
export default function ArtistLink(v: tArtistLink) {
  let id = v.idArtist.split(" ");
  let name = v.nameArtist.split(",");

  return (
    <div className="flex space-x-2 text-stone-500">
      {id.map((va, ix) => {
        return <Link to={`/artist/${va}`}>{name[ix]}</Link>;
      })}
    </div>
  );
}
