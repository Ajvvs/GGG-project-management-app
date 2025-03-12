import { db } from "@/db"; // Import Drizzle DB instance

// Get all users
const getAllUsers = async () => {
    try {
        const users = await db.users.findMany({
            select: {
                user_id: true,
                username: true,
                email: true,
            },
        });
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Could not retrieve users.');
    }
}

// Get a single user by user_id
const getUser = async (uid: number) => {
    try {
        const user = await db.users.findFirst({
            where: {
                user_id: uid,
            },
            select: {
                user_id: true,
                username: true,
                email: true,
            },
        });
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Could not retrieve user.');
    }
}

// Create a new user
const createUser = async (username: string, email: string, passwordHash: string, fullName: string) => {
    try {
        const user = await db.users.create({
            data: {
                username,
                email,
                password_hash: passwordHash,
                full_name: fullName,
            },
        });
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Could not create user.');
    }
}

// Update an existing user by user_id
const updateUser = async (uid: number, username?: string, email?: string, passwordHash?: string, fullName?: string) => {
    try {
        const user = await db.users.update({
            where: {
                user_id: uid,
            },
            data: {
                username,                       // Optional field, will update if provided
                email,                          // Optional field, will update if provided
                password_hash: passwordHash,    // Optional field, will update if provided
                full_name: fullName,            // Optional field, will update if provided
            },
        });
        return user;
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Could not update user.');
    }
}

// Delete a user by user_id
const deleteUser = async (uid: number) => {
    try {
        const user = await db.users.delete({
            where: {
                user_id: uid,
            },
        });
        return user;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Could not delete user.');
    }
}
