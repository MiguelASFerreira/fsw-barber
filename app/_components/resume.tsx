import { format } from "date-fns"
import { Card, CardContent } from "./ui/card"
import { ptBR } from "date-fns/locale"

interface ResumeServiceProps {
  name: string
  price: number
  data: Date
  hora: string
  barbearia: string
}

const Resume = ({ ...service }: ResumeServiceProps) => {
  return (
    <Card>
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">{service.name}</h2>
          <p className="text-sm font-bold">
            {Intl.NumberFormat("pt-br", {
              style: "currency",
              currency: "BRL",
            }).format(Number(service.price))}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Data</h2>
          <p className="text-sm font-bold">
            {format(service.data, "d 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Horário</h2>
          <p className="text-sm font-bold">{service.hora}</p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Barbearia</h2>
          <p className="text-sm font-bold">{service.barbearia}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default Resume
