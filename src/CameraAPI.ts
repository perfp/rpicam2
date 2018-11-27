
// const auth : string = "c3Bpb246SmVnU2VyRGVn";

const options: RequestInit = {
    headers: {'Authorization': 'Basic c3Bpb246SmVnU2VyRGVn'},
    // mode: "no-cors"
}

export async function CameraOff(){
    return await fetch("html/cmd_pipe.php?cmd=ru%2000", options);
}

export async function CameraOn(){
    return await fetch("html/cmd_pipe.php?cmd=ru%2001", options);
}

export async function CheckStatus(lastStatus:string){
    let status:string = lastStatus;

    const response = await fetch("html/status_mjpeg.php?last=" + lastStatus, options)
    
    status = await response.text();
    
    return status;  
}

export function GetImage(time:number, delay:number){
    return fetch("html/cam_pic.php?time=" + time + "&pDelay=" + delay, options)
        .then(response =>  response.blob());
}