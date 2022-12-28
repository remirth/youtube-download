export const Container = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <div className="container mx-auto h-screen overflow-hidden px-4">
        <div className="mx-auto grid h-full max-w-3xl auto-cols-auto place-items-center">
          <div className="h-1/2 w-full">
            <div className="mx-auto h-fit min-h-[60%] w-full rounded-xl bg-base-200 shadow-2xl sm:w-1/2">
              <div className="fade-in">
                <main>{children}</main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
