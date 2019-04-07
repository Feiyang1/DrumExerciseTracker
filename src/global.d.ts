// declare const require: {
//     <T>(path: string): T;
//     (paths: string[], callback: (...modules: any[]) => void): void;
//     ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
// };

interface RequireImport {
    default: any;
}

declare const process: any;

// declare const module:any;