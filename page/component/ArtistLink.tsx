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
    <div className="flex text-stone-500">
      {id.map((va, ix) => {
        if ((ix == id.length - 1)) {
          return (
            <Link className="hover:text-white" to={`/artist/${va}`}>
              {name[ix]}
            </Link>
          );
        }
        return (
          <>
            <Link className="hover:text-white" to={`/artist/${va}`}>
              {name[ix]}
            </Link>
            ,
          </>
        );
      })}
    </div>
  );
}
