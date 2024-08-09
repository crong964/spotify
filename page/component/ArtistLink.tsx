import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { NaviPage } from "@/page/home/RootRedux";

type tArtistLink = {
  idArtist: string;
  nameArtist: string;
};
export default function ArtistLink(v: tArtistLink) {
  let id = v.idArtist.split(" ");
  let name = v.nameArtist.split(",");
  const dispatch = useDispatch();
  return (
    <div key={v.idArtist} className="flex text-stone-500">
      {id.map((va, ix) => {
        if (ix == id.length - 1) {
          return (
            <Link
              onClick={() => {
                dispatch(
                  NaviPage({
                    page: "artist",
                    param: va,
                  })
                );
              }}
              className="hover:text-white"
              key={`${va}_${ix}`}
              to={`/artist/${va}`}
            >
              {name[ix]}
            </Link>
          );
        }
        return (
          <>
            <Link
              onClick={() => {
                dispatch(
                  NaviPage({
                    page: "artist",
                    param: va,
                  })
                );
              }}
              className="hover:text-white"
              key={`${va}_${ix}`}
              to={`/artist/${va}`}
            >
              {name[ix]}
            </Link>
            ,
          </>
        );
      })}
    </div>
  );
}
