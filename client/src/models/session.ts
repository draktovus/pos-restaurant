import { reactive } from "vue";
import { useRouter } from "vue-router";

const session = reactive({
    user: null as User | null,
});

interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    admin: boolean;
}

export function useSession() {
    return session;
}

export function useLogout() {
    const router = useRouter();
    return function logout() {
        session.user = null;
        router.push("/login");
    }
}


export function login(users: User) {
    session.user = {
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        username: users.username,
        password: users.password,
        admin: users.admin,
    }
}