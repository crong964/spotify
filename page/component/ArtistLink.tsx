import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootHome } from "@/page/Redux/RootRedux";
type tArtistLink = {
  idArtist: string;
  nameArtist: string;
};
export default function ArtistLink({ idArtist, nameArtist }: tArtistLink) {
  const devicetype = useSelector(
    (state: RootHome) => state.rootHome.devicetype
  );
  let ids = idArtist.split(" ");
  let name = nameArtist.split(",");
  return (
    <div className="flex text-white sm:text-stone-500 overflow-x-hidden w-max font-normal">
      {ids.map((artist_id, indexArtist) => {
        if (indexArtist == ids.length - 1) {
          return (
            <Link
              className="sm:hover:text-white"
              to={devicetype == "pc" ? `/artist/${artist_id}` : "#"}
            >
              {name[indexArtist]}
            </Link>
          );
        }
        return (
          <>
            <Link
              className="sm:hover:text-white "
              to={devicetype == "pc" ? `/artist/${artist_id}` : "#"}
            >
              {name[indexArtist]}
            </Link>
            ,
          </>
        );
      })}
    </div>
  );
}
