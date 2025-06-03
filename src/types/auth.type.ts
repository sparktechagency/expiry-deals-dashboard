import { z } from "zod";
import { loginSchema } from "@/zod/auth.validation" 

export type LoginSchema = z.infer<typeof loginSchema>;