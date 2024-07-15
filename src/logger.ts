type LogEntry = {
    id: number;
    timestamp: string;
    request: {
        url: string;
        method: string;
        body?: any;
    };
    response: {
        status: number;
        data: any;
    };
};

let logs: LogEntry[] = [];
let nextId = 1;

export const addLog = (request: any, response: any) => {
    const log: LogEntry = {
        id: nextId++,
        timestamp: new Date().toISOString(),
        request: {
            url: request.url,
            method: request.method,
            body: request.body,
        },
        response: {
            status: response.status,
            data: response.data,
        },
    };
    logs.push(log);
};

export const getLogs = () => logs;
export const getLogById = (id: number) => logs.find(log => log.id === id);
