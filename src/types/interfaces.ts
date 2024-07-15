export interface RequestBody {
    url: string;
    method: string;
    body: string;
}

export interface AxiosError extends Error {
    response?: {
        status: number;
        data: any;
        headers: Record<string, string>;
    };
}

export interface LogEntry {
    id?: number;
    timestamp: string;
    url: string;
    method: string;
    body: string;
    status: number;
    response: string;
    requestHeaders: string;
    responseHeaders: string;
}

export interface LogParams {
    id: string;
}