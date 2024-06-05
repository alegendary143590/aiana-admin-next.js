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
        const { accessToken, refreshToken, userId } = data;
        const expiryTime = new Date().getTime() + (0.1 * 60 * 1000); // Current time + 15 mins
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        localStorage.setItem('userID', userId);
        localStorage.setItem('token_expiry', expiryTime.toString()); // Store expiration time
    } else {
        throw new Error(data.error);
    }
}
export enum HttpMethod {
    GET = 'GET',
    POST = 'POST'
}

// Define the type for the function parameters
export interface RequestOptions {
    url: string;
    method: HttpMethod;
    data?: any;  // Use a more specific type for `data` if possible, depending on your data structure
}

/**
 * A function to make HTTP requests to a given API endpoint.
 * @param options - The options containing URL, method, and optional data for the request.
 * @returns A promise that resolves to the JSON response.
 */
export async function makeRequest(options: RequestOptions): Promise<any> {
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Assuming you store your token in localStorage
    });

    const config: RequestInit = {
        method: options.method,
        headers,
    }

    if (options.method === HttpMethod.POST && options.data) {
        config.body = JSON.stringify(options.data);
    }

    try {
        const response = await fetch(options.url, config);
        const jsonResponse = await response.json();
        if (!response.ok) {
            throw new Error(jsonResponse.message || 'Something went wrong with the API');
        }
        return jsonResponse;
    } catch (error) {
        console.error('Error making the request:', error);
        throw error;
    }
}

