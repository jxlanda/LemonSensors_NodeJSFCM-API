export interface Message {
    tokens: string[];
    notification: Notification
}

export interface Notification {
    body: string;
    title: string;
}