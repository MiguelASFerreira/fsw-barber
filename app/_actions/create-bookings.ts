"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

interface CreateBookingsParams {
  userId: string
  serviceId: string
  date: Date
}

export const CreateBookings = async (params: CreateBookingsParams) => {
  await db.booking.create({
    data: params,
  })

  revalidatePath("/barbershops/[id]")
}
