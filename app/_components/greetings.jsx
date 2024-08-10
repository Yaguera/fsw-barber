"use client"
import { useSession, signIn } from "next-auth/react"
import { useMemo } from "react";

const Greetings = () => {
    const { data } = useSession();

    // Formatar a data atual
    const formattedDate = useMemo(() => {
        const today = new Date();
        const day = today.toLocaleDateString('pt-BR', { weekday: 'long' });
        const date = today.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
        return `${day[0].toUpperCase() + day.substring(1)}, ${date}`;
    }, []);

    const handleLoginWithGoogle = () => signIn("google");

    return (
        <div>
            {data?.user ? (
                <>
                    <h2 className="text-xl font-bold">Olá, <span className="text-primary">{data.user.name}</span></h2>
                    <p>{formattedDate}</p>
                </>
            ) : (
                <>
                    <h2 className="text-xl font-bold">
                        <span>Olá, </span>
                        <button 
                            className="text-primary" 
                            onClick={handleLoginWithGoogle}
                        >
                            Faça seu Login!
                        </button>
                    </h2>
                    <p>{formattedDate}</p>
                </>
            )}
        </div>
    );
}

export default Greetings;
