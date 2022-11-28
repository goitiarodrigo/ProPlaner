import { VITE_SOME_PASSWORD, VITE_SOME_USER } from "@/constant";

const homerPhoto = 'https://media.ambito.com/p/20528b94a01519e57cf4d14f121c68c1/adjuntos/239/imagenes/039/850/0039850910/1200x675/smart/homerjpeg.jpeg'

export const ValidateLogin = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
        if (email !== VITE_SOME_USER || password !== VITE_SOME_PASSWORD) {
            reject({message: 'Email or Password is wrong'})
        } else resolve({name: 'ProPlaner', profilePhoto: homerPhoto})
        
    })
}