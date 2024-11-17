import React, { Suspense } from "react";
import GenreForm from "./GenreForm";
import Navi from "./Navi";
import Main from "./Main";
import SongAndGenre from "./SongAndGenre";
import { useSelector } from "react-redux";
import { RootState } from "./Redux";
import PlayListForm from "./PlayList/PlayListForn";
import PlaylistAndGenre from "./PlayList/PlaylistAndGenre";
import PlayListEdit from "./PlayList/PlayListEdit";
import UserList from "./user/UserList";
import Employls from "./user/Employls";
import { Outlet, Route, Routes } from "react-router-dom";
import Artist, { AddArtist, ArtistDetail } from "./artist/Artist";
import ArtistList from "./artist/Artist";
import SongListAndInforArtist from "./artist/SongListAndInforArtist";
import CmdPage from "./Cmd/CmdPage";

export default function App() {
  var children: React.JSX.Element;
  const page = useSelector((state: RootState) => state.navi.page);
  return (
    <Suspense fallback={<>loading</>}> 
      <Routes>
        <Route path="/" element={<ShareCenter />}>
          <Route
            index
            element={
              <Main title="Danh sách nhạc">
                <SongAndGenre />
              </Main>
            }
          />
          <Route
            path="songlist"
            element={
              <Main title="Danh sách nhạc">
                <SongAndGenre />
              </Main>
            }
          />
          <Route
            path="genre"
            element={
              <Main title="Thể loại">
                <GenreForm />
              </Main>
            }
          />
          <Route path="playlist">
            <Route
              index
              element={
                <Main title="Danh sách các danh sách nhạc">
                  <PlaylistAndGenre />
                </Main>
              }
            />
            <Route path="edit">
              <Route
                path=":idPlaylistEdit"
                element={
                  <Main title="Chỉnh sửa danh sách">
                    <PlayListEdit />
                  </Main>
                }
              />
            </Route>
            <Route
              path="add"
              element={
                <Main title="Form thêm danh sách nhạc">
                  <PlayListForm />
                </Main>
              }
            />
          </Route>
          <Route path="user" element={<Outlet></Outlet>}>
            <Route
              path="employls"
              element={
                <Main title="Danh sách nhân viên">
                  <Employls />
                </Main>
              }
            />
            <Route
              path="userlist"
              element={
                <Main title="Danh sách người dùng">
                  <UserList />
                </Main>
              }
            />
          </Route>
          <Route path="artist" element={<Outlet></Outlet>}>
            <Route
              index
              element={
                <Main title="Danh sách ca sĩ công ty quản lý">
                  <ArtistList />
                </Main>
              }
            />
            <Route
              path="add"
              element={
                <Main title="Thêm ca sĩ công ty quản lý">
                  <AddArtist />
                </Main>
              }
            />
            <Route
              path="songlist/:idArtist"
              element={
                <Main title="Danh sách nhạc của ca sĩ">
                  <SongListAndInforArtist></SongListAndInforArtist>
                </Main>
              }
            />
            <Route
              path=":idArtist"
              element={
                <Main title="Chỉnh sửa ca sĩ">
                  <ArtistDetail />
                </Main>
              }
            />
          </Route>
          <Route path="cmd" element={<Outlet></Outlet>}>
            <Route
              index
              element={
                <Main title="Lệnh">
                  <CmdPage />
                </Main>
              }
            />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
function ShareCenter() {
  return (
    <div className="w-full h-full border-t flex flex-row">
      <Navi />
      <Outlet />
    </div>
  );
}
function Center() {
  return (
    <Routes>
      <Route path="/" element={<Outlet></Outlet>}>
        <Route
          index
          element={
            <Main title="Danh sách nhạc">
              <SongAndGenre />
            </Main>
          }
        />
        <Route
          path="songlist"
          element={
            <Main title="Danh sách nhạc">
              <SongAndGenre />
            </Main>
          }
        />
      </Route>
      <Route
        path="genre"
        element={
          <Main title="Thể loại">
            <GenreForm />
          </Main>
        }
      />
      <Route path="playlist" element={<Outlet></Outlet>}>
        <Route
          path=""
          element={
            <Main title="Danh sách các danh sách nhạc">
              <PlaylistAndGenre />
            </Main>
          }
        />
        <Route path="edit">
          <Route
            path=":idPlaylistEdit"
            element={
              <Main title="Chỉnh sửa danh sách">
                <PlayListEdit />
              </Main>
            }
          />
        </Route>

        <Route
          path="add"
          element={
            <Main title="Form thêm danh sách nhạc">
              <PlayListForm />
            </Main>
          }
        />
      </Route>
      <Route path="user" element={<Outlet></Outlet>}>
        <Route
          path="employls"
          element={
            <Main title="Danh sách nhân viên">
              <Employls />
            </Main>
          }
        />
        <Route
          path="userlist"
          element={
            <Main title="Danh sách người dùng">
              <UserList />
            </Main>
          }
        />
      </Route>
      <Route path="artist" element={<Outlet></Outlet>}>
        <Route
          path=""
          element={
            <Main title="Danh sách ca sĩ công ty quản lý">
              <ArtistList />
            </Main>
          }
        />
        <Route
          path="add"
          element={
            <Main title="Thêm ca sĩ công ty quản lý">
              <AddArtist />
            </Main>
          }
        />
        <Route
          path=":idArtist"
          element={
            <Main title="Chỉnh sửa ca sĩ">
              <ArtistDetail />
            </Main>
          }
        />
        <Route
          path="songlist/:idArtist"
          element={
            <Main title="Danh sách nhạc của ca sĩ">
              <SongListAndInforArtist></SongListAndInforArtist>
            </Main>
          }
        />
      </Route>
      <Route path="cmd" element={<Outlet></Outlet>}>
        <Route
          path=""
          element={
            <Main title="Lệnh">
              <CmdPage />
            </Main>
          }
        />
      </Route>
    </Routes>
  );
}
