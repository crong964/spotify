import React from "react";
import GenreForm from "./GenreForm";
import Navi from "./Navi";
import Main from "./Main";
import SongAndGenre from "./SongAndGenre";
import { useSelector } from "react-redux";
import { RootState } from "./Redux";
import PlayListForm from "./PlayList/PlayListForn";

export default function App() {
  var children: React.JSX.Element;
  const page = useSelector((state: RootState) => state.navi.page);

  switch (page) {
    case "genre":
      children = (
        <Main title="Thể loại">
          <GenreForm />
        </Main>
      );
      break;
    case "playlist":
      children = (
        <Main title="Form thêm danh sách nhạc">
          <PlayListForm />
        </Main>
      );
      break;
    default:
      children = (
        <Main title="Danh sách nhạc">
          <SongAndGenre />
        </Main>
      );
      break;
  }
  return (
    <div className="w-full flex h-full">
      <Navi />
      <div className="relative  w-full flex flex-col h-full overflow-y-auto">
        <div className="w-full h-full border-t flex flex-col">{children}</div>
      </div>
    </div>
  );
}
