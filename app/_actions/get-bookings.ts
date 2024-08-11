"use server"
import { endOfDay, startOfDay } from "date-fns"
import { db } from "../_lib/prisma"

interface GetBookingsProps {
  serviceId: string
  date: Date
}

export const getBookings = async (params: GetBookingsProps) => {
  return await db.booking.findMany({
    where: {
      serviceId: params.serviceId,
      date: {
        lte: endOfDay(params.date),
        gte: startOfDay(params.date),
      },
    },
  })
}
