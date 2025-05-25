import { z } from "zod";

const schema = z.object({
    email: z.string().email("Invalid email"),
    is_active: z.boolean().optional(),
    name: z.string().min(1, "Name is required"),
    password: z.string().optional(),
    roles: z
        .union([
            z.string().min(1, "Role is required"),
            z.array(z.string()).min(1, "At least one role is required"),
        ])
        .optional(),
});

type UserSchema = z.output<typeof schema>;

const userState = reactive<Partial<UserSchema>>({
    email: "",
    is_active: false,
    name: "",
    password: "",
    roles: [],
});

export { schema, userState, type UserSchema };
