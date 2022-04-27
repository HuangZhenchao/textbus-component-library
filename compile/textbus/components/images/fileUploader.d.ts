import { Observable } from "@tanbo/stream";
import { UploadConfig } from "@textbus/editor";
export declare class MyFileUploader {
    upload(config: UploadConfig): Observable<string | string[]>;
}
