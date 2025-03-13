import db from "../db"; // Import Drizzle DB instance
import { projects } from '../database-schema/schema'; // Import the projects schema
import { eq } from 'drizzle-orm/expressions'; // Import the eq function

// Define the ProjectData interface
interface ProjectData {
    project_name: string; // Name of the project
    description?: string; // Optional description
    created_by: string; // UUID of the user creating the project
    start_date?: Date; // Optional start date
    due_date?: Date; // Optional due date
    status?: string; // Optional status
}

// Get all projects
const getAllProjects = async () => {
    try {
        const projectList = await db.select().from(projects).execute();
        return projectList;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw new Error('Could not retrieve projects.');
    }
}

// Get a single project by project_id
export const getProjectById = async (pid: number) => { // Ensure pid is of type number
    try {
        const project = await db
            .select()
            .from(projects)
            .where(eq(projects.project_id, pid)) 
            .execute();
        return project[0]; // Return the first project found
    } catch (error) {
        console.error('Error fetching project:', error);
        throw new Error('Could not retrieve project.');
    }
};

// Create a new project
const createProject = async (projectData: ProjectData) => {
    try {
        const project = await db.insert(projects).values(projectData);
        return project;
    } catch (error) {
        console.error('Error creating project:', error);
        throw new Error('Could not create project.');
    }
}

// Update an existing project
const updateProject = async (projectId: number, projectData: ProjectData) => { // Ensure projectId is of type number
    try {
        const updatedProject = await db
            .update(projects)
            .set(projectData)
            .where(eq(projects.project_id, projectId)) // Use the eq function for comparison
            .execute();
        return updatedProject;
    } catch (error) {
        console.error('Error updating project:', error);
        throw new Error('Could not update project.');
    }
};

// Delete a project by project_id
const deleteProject = async (projectId: number) => {
    try {
        await db.delete(projects).where(eq(projects.project_id, projectId)).execute();
    } catch (error) {
        console.error('Error deleting project:', error);
        throw new Error('Could not delete project.');
    }
}
