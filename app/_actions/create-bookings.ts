"use server"

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
}
