import { z } from "zod";

const schema = z.object({
    guard_name: z.string().optional(),
    name: z.string().min(1, "Name is required"),
});

type Schema = z.output<typeof schema>;

const formState = reactive<Partial<Schema>>({
    guard_name: "",
    name: "",
});

export { schema, formState, type Schema };
