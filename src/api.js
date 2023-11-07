import axios from 'axios'

let apiURL = 'http://localhost:8888'    // FOR REQUESTS TO THE JSON SERVER

const ax = axios.create({
    baseURL: apiURL
});
console.log("REQUESTS ARE BEING SENT TO: " + apiURL);

export function getAllUsers(){
    return ax.get("users/").then(resp => (resp.data)).catch(error => errorHandler("Error Getting All Users:" + error));
}

export function getAllRoles() {
    return ax.get("roles/").then(resp => (resp.data)).catch((error) => errorHandler("Error Getting All Roles:" + error));
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

function errorHandler(msg){
    console.log("API ERROR", msg);
    throw new Error(msg); // because we throw an error here, we can catch it in our components.
}