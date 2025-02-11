import { z } from "zod";
import { parseError } from "@/lib/utils";
import { ActionResult } from "./types";

export async function handleAction<T, R = void>({
  schema,
  formData,
  action,
  onError,
}: {
  schema: z.Schema<T>;
  formData: FormData;
  action: (data: T) => Promise<R>;
  onError?: (error: unknown) => void;
}): Promise<ActionResult<R>> {
  const result = schema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    console.error(result.error);
    return {
      error: "Invalid form data",
    };
  }

  try {
    const data = await action(result.data);
    return { data };
  } catch (e) {
    onError?.(e);
    return {
      error: parseError(e),
    };
  }
}
