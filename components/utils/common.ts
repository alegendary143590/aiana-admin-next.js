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