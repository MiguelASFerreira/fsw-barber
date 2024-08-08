import Image from "next/image"

type BannerProps = {
  src: string
  alt: string
}

const Banner = ({ ...props }: BannerProps) => {
  return (
    <div className="relative h-[150px] w-full">
      <Image
        src={props.src}
        alt={props.alt}
        fill
        className="rounded-xl object-cover"
      />
    </div>
  )
}

export default Banner
