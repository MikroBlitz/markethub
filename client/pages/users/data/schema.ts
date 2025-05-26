import { z } from "zod";
const phoneRegex = /^(?:\+63|0)?9\d{9}$/;

const schema = z.object({
    email: z.string().email("Invalid email"),
    first_name: z.string().min(1, "First name is required"),
    is_active: z.boolean().optional(),
    last_name: z.string().min(1, "Last name is required"),
    middle_name: z.string().optional(),
    password: z.string().optional(),
    phone: z
        .string()
        .regex(phoneRegex, "Invalid Philippine phone number")
        .optional(),
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
    first_name: "",
    is_active: false,
    last_name: "",
    middle_name: "",
    password: "",
    phone: "",
    roles: [],
});

export { schema, userState, type UserSchema };
