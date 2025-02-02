import React, { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NaviPage, RootHome } from "@/page/Route/home/RootRedux";
type tArtistLink = {
  idArtist: string;
  nameArtist: string;
};
export default function ArtistLink(v: tArtistLink) {
  const devicetype = useSelector(
    (state: RootHome) => state.rootHome.devicetype
  );
  let id = v.idArtist.split(" ");
  let name = v.nameArtist.split(",");
  const dispatch = useDispatch();
  return (
    <div className="flex text-white sm:text-stone-500 font-normal">
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
              className="sm:hover:text-white"
              to={devicetype == "pc" ? `/artist/${va}` : "#"}
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
              className="sm:hover:text-white"
              to={devicetype == "pc" ? `/artist/${va}` : "#"}
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
