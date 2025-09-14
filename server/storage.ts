import { type User, type InsertUser, type UserProgress, type InsertUserProgress, type UserAchievement, type InsertUserAchievement } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  getUserProgress(userId: string): Promise<UserProgress[]>;
  updateUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  getUserAchievements(userId: string): Promise<UserAchievement[]>;
  addUserAchievement(achievement: InsertUserAchievement): Promise<UserAchievement>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private userProgress: Map<string, UserProgress>;
  private userAchievements: Map<string, UserAchievement>;

  constructor() {
    this.users = new Map();
    this.userProgress = new Map();
    this.userAchievements = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      level: 1, 
      xp: 0, 
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values()).filter(
      (progress) => progress.userId === userId,
    );
  }

  async updateUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    // Find existing progress for this user and skill combination
    const existingProgress = Array.from(this.userProgress.values()).find(
      (progress) => 
        progress.userId === insertProgress.userId && 
        progress.skillPath === insertProgress.skillPath &&
        progress.skillNode === insertProgress.skillNode
    );

    if (existingProgress) {
      // Update existing progress entry, preserving existing values when not provided
      const completed = insertProgress.completed ?? existingProgress.completed;
      const completedAt = insertProgress.completed === true && !existingProgress.completed 
        ? new Date() 
        : insertProgress.completed === false 
          ? null 
          : existingProgress.completedAt;
      
      const updatedProgress: UserProgress = {
        ...existingProgress,
        completed,
        completedAt,
      };
      this.userProgress.set(existingProgress.id, updatedProgress);
      return updatedProgress;
    } else {
      // Create new progress entry
      const id = randomUUID();
      const progress: UserProgress = {
        ...insertProgress,
        id,
        completed: insertProgress.completed ?? false,
        completedAt: insertProgress.completed ? new Date() : null,
      };
      this.userProgress.set(id, progress);
      return progress;
    }
  }

  async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    return Array.from(this.userAchievements.values()).filter(
      (achievement) => achievement.userId === userId,
    );
  }

  async addUserAchievement(insertAchievement: InsertUserAchievement): Promise<UserAchievement> {
    // Check if achievement already exists
    const existing = Array.from(this.userAchievements.values()).find(
      (achievement) => 
        achievement.userId === insertAchievement.userId && 
        achievement.achievementId === insertAchievement.achievementId
    );
    
    if (existing) {
      return existing; // Return existing achievement if already earned
    }

    const id = randomUUID();
    const achievement: UserAchievement = {
      ...insertAchievement,
      id,
      earnedAt: new Date(),
    };
    this.userAchievements.set(id, achievement);
    return achievement;
  }
}

export const storage = new MemStorage();
