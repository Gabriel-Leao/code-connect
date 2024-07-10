import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

type IconButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const IconButton = (props: IconButtonProps) => {
  return (
    <button
      {...props}
      className="border-none cursor-pointer bg-transparent"
    />
  )
}

export default IconButton
