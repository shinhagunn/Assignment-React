export interface ErrorProp {
  value: string
}

const Error = (props: ErrorProp) => {
  return (
    <span className="text-red-500 block mt-1 h-6">
      {props.value !== "" ? props.value : ""}
    </span>
  )
}

export default Error;