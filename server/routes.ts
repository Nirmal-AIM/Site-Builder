import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, loginSchema, insertUserProgressSchema } from "@shared/schema";
import bcryptjs from "bcryptjs";

// Authentication middleware
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
}

// Skill tree configuration for XP calculation
const skillTrees = [
  {
    id: "prompting-basics",
    skills: [
      { name: "Prompt Structure", xp: 100 },
      { name: "Context Setting", xp: 150 },
      { name: "Clear Instructions", xp: 200 },
      { name: "Output Formatting", xp: 250 },
    ],
  },
  {
    id: "advanced-techniques",
    skills: [
      { name: "Role-Based Prompting", xp: 200 },
      { name: "Chain of Thought", xp: 300 },
      { name: "Few-Shot Learning", xp: 350 },
      { name: "Constraint Handling", xp: 400 },
    ],
  },
  {
    id: "specialized-prompting",
    skills: [
      { name: "Creative Writing", xp: 250 },
      { name: "Data Analysis", xp: 300 },
      { name: "Code Generation", xp: 350 },
      { name: "Research & Synthesis", xp: 400 },
    ],
  },
];

// Calculate level from XP
function calculateLevel(xp: number): number {
  return Math.floor(xp / 500) + 1;
}

// Get skill XP by path and node
function getSkillXP(skillPath: string, skillNode: string): number {
  const tree = skillTrees.find(t => t.id === skillPath);
  if (!tree) return 0;
  
  const skillName = skillNode.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  const skill = tree.skills.find(s => s.name === skillName);
  return skill?.xp || 0;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcryptjs.hash(userData.password, 10);
      
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword,
      });

      // Create session
      req.session.userId = user.id;

      // Remove password from response
      const { password, ...userResponse } = user;
      res.status(201).json(userResponse);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const loginData = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(loginData.email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await bcryptjs.compare(loginData.password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Create session
      req.session.userId = user.id;

      // Remove password from response
      const { password, ...userResponse } = user;
      res.json(userResponse);
    } catch (error) {
      res.status(400).json({ message: "Invalid login data" });
    }
  });

  // Logout route
  app.post("/api/auth/logout", requireAuth, (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Could not log out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  // Get current user route
  app.get("/api/auth/me", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { password, ...userResponse } = user;
      res.json(userResponse);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user data" });
    }
  });

  // Progress routes (secured with authentication)
  app.get("/api/user/progress", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  app.post("/api/user/progress", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const { skillPath, skillNode, completed } = insertUserProgressSchema
        .omit({ userId: true })
        .parse(req.body);
      
      // Update progress with authenticated user ID
      const progressData = {
        userId,
        skillPath,
        skillNode,
        completed,
      };
      
      const progress = await storage.updateUserProgress(progressData);
      
      // If skill was completed, calculate and update user XP and level
      if (completed) {
        const skillXP = getSkillXP(skillPath, skillNode);
        if (skillXP > 0) {
          const currentUser = await storage.getUser(userId);
          if (currentUser) {
            const newXP = currentUser.xp + skillXP;
            const newLevel = calculateLevel(newXP);
            
            const updatedUser = await storage.updateUser(userId, {
              xp: newXP,
              level: newLevel,
            });
            
            if (updatedUser) {
              const { password, ...userResponse } = updatedUser;
              return res.json({
                progress,
                user: userResponse,
                earnedXP: skillXP,
              });
            }
          }
        }
      }
      
      res.json({ progress });
    } catch (error) {
      console.error('Progress update error:', error);
      res.status(400).json({ message: "Invalid progress data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
