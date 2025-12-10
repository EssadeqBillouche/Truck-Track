import jwt from "jsonwebtoken";

export interface jwtDtoPayloud {
    email : string,
    name : string,
    role : string
}


const jwtKey = process.env.JWTkeys ;

class jwtHandeler{


    static createToken(payloud : jwtDtoPayloud){

        return jwt.sign(payloud, jwtKey as string, { expiresIn : '24h'})
    }

    static verfyToken(token : string) : jwtDtoPayloud {

        const decoded = jwt.verify(token, jwtKey as string) as jwtDtoPayloud;
        return decoded;
    }

    static decodeToken(token : string) : jwtDtoPayloud | null {

        const decoded = jwt.decode(token) as jwtDtoPayloud | null;
        return decoded;
    }
}

export default jwtHandeler;