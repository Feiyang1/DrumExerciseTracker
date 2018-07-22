export interface Action<T> {
    type: string;
    payload: T;
}

export interface VoidAction {
    type: string;
}

export default Action;