import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "@/service/firebaseConnection";

interface AuthContextProps {
    signed: boolean;
    user: UserProps | null;
    loadingAuth: boolean;
}

interface UserProps {
    uid: string;
    name: string | null;
    email: string | null;
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({children}: {children: ReactNode}){

    const [user, setUser] = useState<UserProps | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(true)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user){
                setUser({
                    name: user?.displayName,
                    email: user?.email,
                    uid: user?.uid
                })

                setLoadingAuth(false)
            } else{
                setLoadingAuth(false)
                setUser(null)
            }
        })

        return () => unsub()
    }, [])

    return(
        <AuthContext value={{ signed: !!user, loadingAuth, user }}>
            {children}
        </AuthContext>
    )
}

