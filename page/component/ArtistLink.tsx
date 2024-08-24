import React, { useId } from "react";
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
  let ids = useId();
  return (
    <div key={ids} className="flex text-stone-500 font-normal">
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
              key={`${ids}_${ix}`}
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
              key={`${ids}_${ix}`}
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
