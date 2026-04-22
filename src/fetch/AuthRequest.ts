const AuthRequests = {
    checkTokenExpiry: (): boolean => {
        const token = localStorage.getItem('token');
        if (!token) return false;
        // Assuming JWT, decode and check exp
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const exp = payload.exp * 1000; // in ms
            return Date.now() < exp;
        } catch {
            return false;
        }
    },
    removeToken: (): void => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAuth');
        localStorage.removeItem('email');
    }
};

export default AuthRequests;
