
const Error = ({error}:{error:string | null}) => {
  return (
    <div className="text-primary">{error}</div>
  )
}

export default Error