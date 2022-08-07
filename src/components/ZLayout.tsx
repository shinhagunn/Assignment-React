const ZLayout = (props: React.PropsWithChildren) => {
  return (
    <div className="z-layout flex flex-auto flex-col min-h-screen bg-white">
      {props.children}
    </div>
  )
}

export default ZLayout;
