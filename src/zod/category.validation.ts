import { z } from "zod";
import {
  imageFileSchema,
  imageFileSchemaOptional,
} from "./imageFile.validation";

export const addCategoryValidationSchema = z.object({
  name: z
    .string({ required_error: "Category name is required" })
    .min(3, { message: "Category name must be at least 3 characters long" })
    .max(100, { message: "Category name must be at most 100 characters long" }),
  banner: imageFileSchema,
});

export const editCategoryValidationSchema = z.object({
  name: z
    .string({ required_error: "Category name is required" })
    .min(3, { message: "Category name must be at least 3 characters long" })
    .max(100, { message: "Category name must be at most 100 characters long" }),
  banner: imageFileSchemaOptional,
});
