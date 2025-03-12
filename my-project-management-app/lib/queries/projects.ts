import { db } from "@/db"; // Import Drizzle DB instance

// Get all projects
const getAllProjects = async () => {
    try {
        const projects = await db.projects.findMany({
            select: {
                project_id: true,
                project_name: true,
                description: true,
                created_by: true,  // You might want to fetch the user who created the project
                start_date: true,
                due_date: true,
                status: true,
                created_at: true,
                updated_at: true,
            },
        });
        return projects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw new Error('Could not retrieve projects.');
    }
}

// Get a single project by project_id
const getProject = async (pid: number) => {
    try {
        const project = await db.projects.findFirst({
            where: {
                project_id: pid,
            },
            select: {
                project_id: true,
                project_name: true,
                description: true,
                created_by: true,
                start_date: true,
                due_date: true,
                status: true,
                created_at: true,
                updated_at: true,
            },
        });
        return project;
    } catch (error) {
        console.error('Error fetching project:', error);
        throw new Error('Could not retrieve project.');
    }
}

// Create a new project
const createProject = async (project_name: string, description: string, created_by: string, start_date: string, due_date: string, status: string) => {
    try {
        const project = await db.projects.create({
            data: {
                project_name,
                description,
                created_by, // this would be the user ID from SuperTokens
                start_date,
                due_date,
                status,
            },
        });
        return project;
    } catch (error) {
        console.error('Error creating project:', error);
        throw new Error('Could not create project.');
    }
}

// Update an existing project by project_id
const updateProject = async (pid: number, project_name?: string, description?: string, start_date?: string, due_date?: string, status?: string) => {
    try {
        const project = await db.projects.update({
            where: {
                project_id: pid,
            },
            data: {
                project_name,   // Optional field, will only update if provided
                description,    // Optional field, will only update if provided
                start_date,     // Optional field, will only update if provided
                due_date,       // Optional field, will only update if provided
                status,         // Optional field, will only update if provided
            },
        });
        return project;
    } catch (error) {
        console.error('Error updating project:', error);
        throw new Error('Could not update project.');
    }
}

// Delete a project by project_id
const deleteProject = async (pid: number) => {
    try {
        const project = await db.projects.delete({
            where: {
                project_id: pid,
            },
        });
        return project;
    } catch (error) {
        console.error('Error deleting project:', error);
        throw new Error('Could not delete project.');
    }
}
