export const setUsers = (users) => ({
    type: 'SET_USERS',
    payload: users,
});

export const setLoading = (loading) => ({
    type: 'SET_LOADING',
    payload: loading,
});

export const setError = (error) => ({
    type: 'SET_ERROR',
    payload: error,
});