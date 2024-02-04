export type Chat = {
    id: string;
    messages: Message[];
    password: string;
}

export type Message = {
    id: number;
    text: string;
    sender: User;
}

export type User = {
    username: string;
    socketID: string;
}