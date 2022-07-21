const ZAdminLayout = (props: React.PropsWithChildren) => {
  return (
    <div className="z-admin-layout flex flex-auto flex-col min-h-screen">
      {props.children}
    </div>
  )
}

export default ZAdminLayout;
