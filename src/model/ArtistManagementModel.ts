import UserModel from "./UserModel";

class ArtistManagementModel extends UserModel {
    idArtist: string
    constructor() {
        super()
        this.idArtist = ""
    }
}

export default ArtistManagementModel