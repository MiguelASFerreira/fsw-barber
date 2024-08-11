import { Button } from "./ui/button"

interface TimeItemProps {
  time: string
  selectedTime: any
  // eslint-disable-next-line no-unused-vars
  handleTimeSelect: (time: string) => void
}

const TimeItem = ({ selectedTime, time, handleTimeSelect }: TimeItemProps) => {
  return (
    <Button
      key={time}
      variant={selectedTime === time ? "default" : "outline"}
      className="rounded-full"
      onClick={() => handleTimeSelect(time)}
    >
      {time}
    </Button>
  )
}

export default TimeItem
