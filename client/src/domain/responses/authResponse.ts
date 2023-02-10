export type authResponse = {
    data:{
    message:string
    isValid:boolean
    user_info:{
        id: string;
        username: string;
        email: string;
    }}
}