interface Props {
  className?: string;
}

const ZContainer = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className={`z-container flex ${props.className} w-[1200px] mx-auto`}>
      {props.children}
    </div>
  )
}

export default ZContainer;
