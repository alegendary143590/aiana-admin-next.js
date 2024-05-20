import { AUTH_API } from "./serverURL";

export default function formatDateString(isoDateString: string): string {
    const date = new Date(isoDateString);
    
    // Get day, month, year, hours, and minutes
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    // Construct the new date format
    return `${hours}:${minutes} ${day}/${month}/${year}`;
}

export async function loginUser(email:string, password:string) {
    const response = await fetch((`${AUTH_API.LOGIN}`), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': "1",
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        const { token, userId } = data;
        const expiryTime = new Date().getTime() + (15 * 60 * 1000); // Current time + 15 mins
        localStorage.setItem('token', token);
        localStorage.setItem('userID', userId);
        localStorage.setItem('token_expiry', expiryTime.toString()); // Store expiration time
        return true;
    } else {
        throw new Error(data.error);
    }
}



function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

export function checkTokenExpiration(token) {
    const decodedToken = parseJwt(token);
    if (!decodedToken) return true; // Assume expired or invalid if decoding fails

    const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
    return decodedToken.exp < currentTimestamp;
}
