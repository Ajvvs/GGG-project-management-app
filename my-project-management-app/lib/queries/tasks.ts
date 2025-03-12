import { db } from "@/db"; // Import Drizzle DB instance

// Get all tasks
const getAllTasks = async () => {
    try {
        const tasks = await db.tasks.findMany({
            select: {
                task_id: true,
                task_name: true,
                project_id: true,
            },
        });
        return tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw new Error('Could not retrieve tasks.');
    }
}

// Get a single task by task_id
const getTask = async (tid: number) => {
    try {
        const task = await db.tasks.findFirst({
            where: {
                task_id: tid,
            },
            select: {
                task_id: true,
                task_name: true,
                project_id: true,
            },
        });
        return task;
    } catch (error) {
        console.error('Error fetching task:', error);
        throw new Error('Could not retrieve task.');
    }
}

// Create a new task
const createTask = async (task_name: string, description: string, project_id: number, assigned_to: string) => {
    try {
        const task = await db.tasks.create({
            data: {
                task_name,
                description,
                project_id,
                assigned_to,
            },
        });
        return task;
    } catch (error) {
        console.error('Error creating task:', error);
        throw new Error('Could not create task.');
    }
}

// Update an existing task by task_id
const updateTask = async (tid: number, task_name?: string, description?: string, project_id?: number, assigned_to?: string, status?: string, priority?: string, due_date?: string) => {
    try {
        const task = await db.tasks.update({
            where: {
                task_id: tid,
            },
            data: {
                task_name,  // Optional field, will update if provided
                description,  // Optional field, will update if provided
                project_id,  // Optional field, will update if provided
                assigned_to,  // Optional field, will update if provided
                status,  // Optional field, will update if provided
                priority,  // Optional field, will update if provided
                due_date,  // Optional field, will update if provided
            },
        });
        return task;
    } catch (error) {
        console.error('Error updating task:', error);
        throw new Error('Could not update task.');
    }
}

// Delete a task by task_id
const deleteTask = async (tid: number) => {
    try {
        const task = await db.tasks.delete({
            where: {
                task_id: tid,
            },
        });
        return task;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw new Error('Could not delete task.');
    }
}
