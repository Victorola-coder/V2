import { db, newID } from './init.js';
import { ref, get, set, child } from 'firebase/database';

const dbRef = ref(db);

export function getUsers(){
    return new Promise((res, rej) => {
        get(child(dbRef, '/users/'))
            .then((snapshot) => {
                const resp = Object.values(snapshot.val() || {});
                resp.hasEmail = function(email){ 
                    return this.find(a => a.email == email);
                }
                resp.hasUserName = function(username){
                    return this.find(a => a.userName == username);
                }
                resp.getIds = function(){
                    return this.map(a => a.userId);
                }
                res(resp);
            })
            .catch(rej)
    })
}

export async function createUser(userdata){
    const existingUsers = await getUsers();
    const userId = newID(existingUsers.getIds());
    userdata.userId = userId;
    userdata.name = `${userdata.firstName} ${userdata.lastName}`;
    return new Promise((res, rej) => {
        set(ref(db, `users/${userdata.name}` ), userdata)
            .then(() => res(userId))
            .catch(rej)
    })
}

export function getUser(userId){
    return new Promise((res, rej) => {
        get(child(dbRef, `/users/${userId}`))
            .then(snapshot => res(snapshot.val()))
            .catch(rej)
    })
}

function svgUrl(xname){
    const randomColors = [ "#FF5733", "#FFC300", "#85C1E9", "#58D68D", "#9B59B6", "#E74C3C", "#3498DB", "#F39C12",  "#1ABC9C", "#E74C3C", "#2ECC71", "#9B59B6", "#3498DB", "#F39C12",  "#1ABC9C" ];
    const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
    function generateSquaredInitialAvatar() {
        const initials = xname ? xname.charAt(0).toUpperCase() : '?';
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
            <rect width="100" height="100" fill="${randomColor}" />
            <text x="50" y="50" text-anchor="middle" dominant-baseline="central" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="white">${initials}</text>
        </svg>
        `;
    }
    const svgMarkup = generateSquaredInitialAvatar(); 
    return `data:image/svg+xml;base64,${btoa(svgMarkup)}`;
}

function base64ToBlob(base64String) {
    const matches = base64String.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 string format');
    }
    const mimeType = matches[1];
    const base64Data = matches[2];
    const decodedData = atob(base64Data);
    return new Blob([decodedData], { type: mimeType });
} 