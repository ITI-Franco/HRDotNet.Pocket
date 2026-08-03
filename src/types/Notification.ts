export interface NotificationStates {
    notifications: Notification[];
    isFetching: boolean;
};

export interface Notification {
    isRead: boolean,
    name: string,
    date: string,
    message: string,
    type: string,
    tags: string[]
}

export interface NotificationParamType {
    item: Notification;
};

export interface ImageMap {
    [key: string]: string;
}

export const ValuesNotification = {
    State: {
        isFetching: false,
        notifications: []
    } satisfies NotificationStates,

};