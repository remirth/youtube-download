import {Skeleton} from '../skeleton';
export const Loading = () => {
  return (
    <div className="h-full w-full">
      <div className="grid auto-cols-auto place-items-center p-4">
        <div className="h-8 w-full">
          <Skeleton />
        </div>
        <div className="mt-4 grid h-[94px] w-full grid-cols-2 gap-4 overflow-hidden border-primary">
          <div className="h-full w-full place-self-end">
            <Skeleton />
          </div>
          <div>
            <Skeleton height="20%" width="90%" />
            <Skeleton count={2} height="20%" width="60%" />
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 pb-4">
          <div className="h-12 w-48 lg:w-64">
            <Skeleton />
          </div>
        </div>
        <div className="h-8 w-16">
          <Skeleton height="100%" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
