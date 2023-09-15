export interface CalendarEvent {
    id: string,
    name: string,
    category: string,
    date: string,
    time?: string,
    importance: string;
    description?: string,
}