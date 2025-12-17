import Mysql2 from "../../config/Config";
import RecentSongDatabase from "../../database/RecentSongDatabase";
import RecentSongModel from "../../model/RecentSongModel";

export class RecentSongService {
  recentSongDatabase: RecentSongDatabase;
  constructor(i: RecentSongDatabase) {
    this.recentSongDatabase = i;
  }
  async Add(user_id: string, Id_song: string) {
    var check = await this.recentSongDatabase.Add(user_id, Id_song);

    return check;
  }
  async GetAllByidUser(id: string) {
    var check = await this.recentSongDatabase.GetAllByidUser(id);
    return this.SetLs(check);
  }
  async GetRecentSong(song_id: string, user_id: string) {
    var check = await this.recentSongDatabase.GetRecentSong(song_id, user_id);
    return check.length > 0 ? this.SetLs(check)[0] : undefined;
  }
  async Get(user_id: string, Id_song: string) {
    var check = (await this.recentSongDatabase.Get(
      user_id,
      Id_song
    )) as RecentSongModel[];

    if (check && check.length) {
      var temp = new RecentSongModel();
      temp.setAll(check[0]);
      return temp;
    }
    return undefined;
  }
  async UpdateTime(user_id: string, song_id: string) {
    var check = await this.recentSongDatabase.UpdateTime(user_id, song_id);
    return check;
  }
  async ListenAgainByUserId(user_id: string, start: number) {
    var check = await this.recentSongDatabase.ListenAgainByUserId(
      user_id,
      start
    );
    return this.SetLs(check);
  }
  async Count(user_id: string) {
    var check = await this.recentSongDatabase.Count(user_id);
    return this.SetLs(check).length;
  }
  SetLs(ls: any): RecentSongModel[] {
    if (ls == undefined) {
      return [];
    }
    var check: RecentSongModel[] = [];
    for (let i = 0; i < ls.length; i++) {
      const element = ls[i];
      var temp = new RecentSongModel();
      temp.setAll(element);
      check.push(temp);
    }
    return check;
  }
}

const recentSongServiceImp = new RecentSongService(new RecentSongDatabase());

export default recentSongServiceImp;
