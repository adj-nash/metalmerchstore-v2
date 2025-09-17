import * as z from "zod";

const fileSchema = z.instanceof(File).refine(file => file.size > 0, {
    message: "A product image must be uploaded."
}).transform(file => ({
    ...file,
    preview: URL.createObjectURL(file)
}));

export const createProductSchema = z.object({
    name: z.string({required_error: "Product name is required."}),
    description: z.string({required_error: "Product description is required."}).min(5, "Description must be at least 5 characters."),
    price: z.coerce.number({required_error: "Price is required."}),
    category: z.string({required_error: "Product category is required."}),
    band: z.string({required_error: "Product band name is required."}),
    genre: z.string({required_error: "Band genre is required."}),
    stock: z.coerce.number({required_error: "Stock is required."}).min(1, "Stock must be at least 1"),
    imageUrl: z.string().optional(),
    file: fileSchema.optional(),
}).refine((data) => data.imageUrl || data.file, {
    message: "Please provide an image.",
    path: ["file"]
})

export type CreateProductSchema = z.infer<typeof createProductSchema>;