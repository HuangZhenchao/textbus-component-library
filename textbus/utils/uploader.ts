//处理文件上传的方法
export function SetUploader(uploadFilePromise) {
    function uploader(config) {
        console.log('uploader')
        const fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('multiple','multiple');//多选
        switch (config.uploadType) {
            case 'image':
                fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
                break;
            case 'video':
                fileInput.setAttribute('accept', 'video/mp4');
                break;
            case 'audio':
                fileInput.setAttribute('accept', 'audio/ogg, audio/wav, audio/mpeg');
                break;
            default:
                fileInput.setAttribute('accept', '*');
        }
    
        fileInput.style.cssText = 'position: absolute; left: -9999px; top: -9999px; opacity: 0';
        const promise =  new Promise<string>(resolve => {
            fileInput.addEventListener('change', event => {
                const form = new FormData();
                const el=event.target as HTMLInputElement;
    
                for (const file of el.files!) {
                    //console.log('arrayBuffer',file.arrayBuffer())
                    form.append('file', file);
                }
                form.append('filename', 'file');
                console.log(typeof el.files,el.files!)
                document.body.removeChild(fileInput);
                uploadFilePromise(form).then(response => {
                    let result=response.data.data;
                    resolve(result);                   
                })
    
            })
        })
        document.body.appendChild(fileInput);
        fileInput.click();
        return promise;
    
    }
    return uploader;
}