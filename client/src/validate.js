export function validate(schema, data, message = "Invalid data.") {
    const result = schema.safeParse(data);

    if (!result.success) {
        console.error(result.error.issues);
        throw new Error(message);
    }

    return result.data;
}