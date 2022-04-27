import { Observable } from "@tanbo/stream";
import { FileUploader, UploadConfig } from "@textbus/editor";

export class MyFileUploader{
    upload(config: UploadConfig): Observable<string | string[]> {
        throw new Error("Method not implemented.");
    }
    
}