export const loginUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); 
    return {
        type: 'LOGIN_USER',
        payload: userData
    };
};

export const logoutUser = () => {
    localStorage.removeItem('user'); 
    return {
        type: 'LOGOUT_USER'
    };
};