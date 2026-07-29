"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { ContactRequestStatus } from "@/generated/prisma/enums";

export async function updateRequestStatus(id: string, status: ContactRequestStatus) {
  await prisma.contactRequest.update({ where: { id }, data: { status } });
  revalidatePath("/admin/requests");
}

export async function deleteRequest(id: string) {
  await prisma.contactRequest.delete({ where: { id } });
  revalidatePath("/admin/requests");
}
