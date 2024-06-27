import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    revalidatePath("/");
    return Response.json({ message: "success", status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "error", status: 500 });
  }
}
