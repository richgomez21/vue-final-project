import axios from 'axios'

let apiURL = 'http://localhost:8888'    // FOR REQUESTS TO THE JSON SERVER
// let apiURL = 'http://localhost/api'   // FOR REQUESTS TO THE DEV API PROJECT

const ax = axios.create({
    baseURL: apiURL
});
console.log("REQUESTS ARE BEING SENT TO: " + apiURL);

export function getAllRoles() {
    return ax.get("roles/").then(resp => (resp.data)).catch((error) => errorHandler("Error Getting All Roles:" + error));
}
// //////////////////////////////////////////////////////////////////////////

export function getAllUsers(){
    return ax.get("users/").then(resp => (resp.data)).catch(error => errorHandler("Error Getting All Users:" + error));
}
export function getUserById(id){
    return ax.get("users/" + id).then(resp => (resp.data)).catch((error) => errorHandler("Error Getting User By Id:" + error));
}

export function updateUser(user){
    return ax.put("users/" + user.id, user).catch((error) => errorHandler("Error Updating User:" + error));
}

export function insertUser(user){
    return ax.post("users/", user).catch((error) => errorHandler("Error Inserting User:" + error));
}
//////////////////////////////////////////////////////////////////////////////

export function getAllArtists(){
    return ax.get("artists/").then(resp => (resp.data)).catch(error => errorHandler("Error Getting All Artists:" + error));
}
export function getArtistById(id){
    return ax.get("artists/" + id).then(resp => (resp.data)).catch((error) => errorHandler("Error Getting Artist By Id:" + error));
}

export function updateArtist(artist){
    return ax.put("artists/" + artist.id, artist).catch((error) => errorHandler("Error Updating Artist:" + error));
}

export function insertArtist(artist){
    return ax.post("artists/", artist).catch((error) => errorHandler("Error Inserting Artist:" + error));
}
/////////////////////////////////////////////////////////////

export function getAllAlbums(){
    return ax.get("albums/").then(resp => (resp.data)).catch(error => errorHandler("Error Getting All Albums:" + error));
}
export function getAlbumById(id){
    return ax.get("albums/" + id).then(resp => (resp.data)).catch((error) => errorHandler("Error Getting Album By Id:" + error));
}

export function updateAlbum(album){
    return ax.put("albums/" + album.id, album).catch((error) => errorHandler("Error Updating Album:" + error));
}

export function insertAlbum(album){
    return ax.post("albums/", album).catch((error) => errorHandler("Error Inserting Album:" + error));
}
///////////////////////////////////////////

export function login(email, password) {
    return ax.get(`users/?email=${email}&password=${password}`).then(resp => {
		if(resp.data.length == 1){
			return resp.data[0] // we want to get the first, and hopefully only, user from the resp.data array
		}else{
			return null
		}
	});
}

// export function logout(){
//     if(apiURL == "http://localhost:8888"){
//         return;
//     }else{
//         return ax.get("logout/");
//     }
// }

function errorHandler(msg){
    console.log("API ERROR", msg);
    throw new Error(msg); // because we throw an error here, we can catch it in our components.
}