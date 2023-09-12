import axios from 'axios';

const API_BASE_URL = 'https://64ff8339f8b9eeca9e2a35bb.mockapi.io/api/';

const UserService = {
    getAllUsers: async () => {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response.data;
    },

    addUser: async (user) => {
        const response = await axios.post(`${API_BASE_URL}/users`, user);
        return response.data;
    },

    updateUser: async (userId, user) => {
        debugger
        const response = await axios.put(`${API_BASE_URL}/users/${userId}`, user);
        return response.data;
    },

    deleteUser: async (userId) => {
        const response = await axios.delete(`${API_BASE_URL}/users/${userId}`);
        return response.data;
    },

    searchUsers: async (searchParams) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users`);
            const searchData = response.data;

            const filteredData = searchData.filter((user) => {
                const roleMatches = (
                    !searchParams.role ||
                    user.role.value === searchParams.role.value
                );

                return (
                    (!searchParams.id || user.id === searchParams.id) &&
                    (!searchParams.username || user.username === searchParams.username) &&
                    roleMatches
                );
            });

            return filteredData;
        } catch (error) {
            throw error;
        }
    },
};


export default UserService;
