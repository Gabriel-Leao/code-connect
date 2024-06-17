import ErrorComponent from '@/components/Error'

const NotFound = () => {
  return (
    <ErrorComponent
      description="Você pode voltar ao feed e continuar buscando projetos incríveis!"
      image="/not-found.svg"
      title="OPS! Página não encontrada."
    />
  )
}

export default NotFound
