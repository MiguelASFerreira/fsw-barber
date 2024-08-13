import { format, isFuture } from "date-fns"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { ptBR } from "date-fns/locale"
import { Prisma } from "@prisma/client"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import BookingSummary from "./booking-summary"
import PhoneItem from "./phone-item"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

const BookingItem = async ({ booking }: BookingItemProps) => {
  const {
    service: { barbershop },
  } = booking
  const isConfirmed = isFuture(booking.date)
  return (
    <>
      <Sheet>
        <SheetTrigger className="w-full">
          <Card className="mb-4 min-w-[90%]">
            <CardContent className="flex justify-between p-0">
              <div className="flex flex-col gap-2 py-5 pl-5">
                <Badge
                  className="w-fit"
                  variant={isConfirmed ? "default" : "secondary"}
                >
                  {isConfirmed ? "Confirmado" : "Finalizado"}
                </Badge>{" "}
                <h3 className="font-semibold">{booking.service.name}</h3>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={barbershop.imageUrl} />
                  </Avatar>
                  <p className="text-sm">{barbershop.name}</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
                <p className="text-sm">
                  {format(booking.date, "MMMM", {
                    locale: ptBR,
                  })}
                </p>
                <p className="text-2xl">
                  {format(booking.date, "dd", {
                    locale: ptBR,
                  })}
                </p>
                <p className="text-sm">
                  {format(booking.date, "HH:mm", {
                    locale: ptBR,
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </SheetTrigger>
        <SheetContent className="w-[90%]">
          <SheetHeader>
            <SheetTitle className="text-left">
              Informações da Reserva
            </SheetTitle>
          </SheetHeader>

          <div className="relative mt-6 flex h-[180px] w-full items-end">
            <Image
              src="/map.png"
              alt={`Mapa da barberaria: ${barbershop.name}`}
              fill
              className="rounded-xl object-cover"
            />

            <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
              <CardContent className="flex items-center gap-3 px-5 py-5">
                <Avatar>
                  <AvatarImage src={barbershop.imageUrl} />
                </Avatar>
                <div>
                  <h3 className="font-bold">{barbershop.name}</h3>
                  <p className="text-xs">{barbershop.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Badge
              className="w-fit"
              variant={isConfirmed ? "default" : "secondary"}
            >
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>

            <div className="mb-6 mt-3">
              <BookingSummary
                barbershop={barbershop}
                service={booking.service}
                key={booking.id}
                selectedDate={booking.date}
              />
            </div>

            <div className="space-y-3">
              {barbershop.phones.map((phone) => (
                <PhoneItem key={phone} phone={phone} />
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default BookingItem
