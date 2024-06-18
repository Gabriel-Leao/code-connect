'use client'

import ErrorComponent from '@/components/Error'

const Error = () => {
  return (
    <ErrorComponent
      description="Não conseguimos carregar a página, volte para seguir navegando. "
      image="error.svg"
      title="Opa! Um erro ocorreu."
    />
  )
}

export default Error
