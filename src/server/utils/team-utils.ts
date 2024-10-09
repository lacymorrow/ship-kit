import { db } from "@/server/db";
import { apiKeys, projects, teamMembers, teams, users } from "@/server/db/schema";
import { User } from "@stackframe/stack";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function ensureUserHasTeam(authUser: User) {
  // First, check if the user exists
  let user = await db.query.users.findFirst({
    where: eq(users.id, authUser.id),
  });

  if (!user) {
    // Create the user if they don't exist
    const newUser = {
      id: authUser.id,
      primaryEmail: authUser.primaryEmail ?? "",
      displayName: authUser.displayName ?? "",
      primaryEmailVerified: authUser.primaryEmailVerified ?? false,
      profileImageUrl: authUser.profileImageUrl ?? "",
      signedUpAt: new Date(),
    };
    await db.insert(users).values(newUser);
    user = newUser;
  }

  // Check if the user is already in a team
  const existingTeamMember = await db.query.teamMembers.findFirst({
    where: eq(teamMembers.userId, user.id),
  });

  if (existingTeamMember) {
    return existingTeamMember.teamId;
  }

  // If not, create a new team, team membership, and default project
  const newTeamId = nanoid();
  const newProjectId = nanoid();

  await db.transaction(async (tx) => {
    await tx.insert(teams).values({
      id: newTeamId,
      name: "My Team",
    });
    console.log("creating new team");

    await tx.insert(teamMembers).values({
      id: nanoid(),
      userId: user.id,
      teamId: newTeamId,
      role: "owner",
    });

    await tx.insert(projects).values({
      id: newProjectId,
      name: "Default Project",
      teamId: newTeamId,
    });
  });

  return newTeamId;
}

export async function createProjectForTeam(teamId: string, projectName: string) {
  const newProjectId = nanoid();
  await db.insert(projects).values({
    id: newProjectId,
    name: projectName,
    teamId: teamId,
    createdAt: new Date(), // Add this line
  });
  return { id: newProjectId, name: projectName, teamId };
}

export async function createApiKey(projectId: string, expiresIn?: number) {
  const newApiKeyId = nanoid();
  const key = nanoid(32); // Generate a 32-character API key
  const createdAt = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  const expiresAt = expiresIn ? Math.floor((Date.now() + expiresIn) / 1000) : undefined;

  // First, check if the project exists
  const project = await db.query.projects.findFirst({
    where: eq(projects.id, projectId),
  });

  if (!project) {
    console.error(`Project not found for ID: ${projectId}`);
    throw new Error("Project not found");
  }

  try {
    await db.insert(apiKeys).values({
      id: newApiKeyId,
      key: key,
      projectId: projectId,
      createdAt: createdAt,
      expiresAt: expiresAt,
    });
  } catch (error) {
    console.error('Error inserting API key:', error);
    throw new Error("Failed to create API key");
  }

  return { id: newApiKeyId, key: key };
}

export async function getTeamProjects(teamId: string) {
  return db.query.projects.findMany({
    where: eq(projects.teamId, teamId),
  });
}

export async function isTeamPremium(teamId: string) {
  // Implement your logic to check if a team is premium
  // For now, we'll return false as a placeholder
  return false;
}