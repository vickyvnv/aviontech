// src/api/userApi.ts

interface UserProfile {
    address: { address: string; city: string; coordinates: { lat: number; lng: number; }; postalCode: string; state: string; };
    username: string;
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    // Add other user data fields as needed
}


export const fetchUserProfile = async (): Promise<UserProfile> => {
    try {
        const response = await fetch('https://dummyjson.com/users/');
        // const response = await fetch('https://dummyjson.com/users/${userId}');

        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

// Function to update user profile
export const updateProfile = async (updatedData: {
    id: number;
    username: string;
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
  }): Promise<UserProfile> => {
    try {
      const response = await fetch('https://dummyjson.com/user/update', {
        method: 'PUT', // or PATCH
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }
      const updatedUser = await response.json();
      return updatedUser;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };
  

// Function to fetch all users
export const getAllUsers = async (): Promise<UserProfile[]> => {
    try {
        const response = await fetch('https://dummyjson.com/users');
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Function to update a user by ID
export const updateUser = async (
    userId: number,
    updatedData: Partial<UserProfile>
): Promise<UserProfile> => {
    try {
        const response = await fetch(`https://dummyjson.com/users/${userId}`, {
            method: 'PUT', // or PATCH
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
        const updatedUser = await response.json();
        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

// Function to add a new user
export const addUser = async (newUser: UserProfile): Promise<UserProfile> => {
    try {
        const response = await fetch('https://dummyjson.com/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser),
        });
        if (!response.ok) {
            throw new Error('Failed to add user');
        }
        const addedUser = await response.json();
        return addedUser;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

// Function to delete a user by ID
export const deleteUser = async (userId: number): Promise<void> => {
    try {
        const response = await fetch(`https://dummyjson.com/users/${userId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete user');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
