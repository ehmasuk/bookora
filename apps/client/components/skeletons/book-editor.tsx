const BookEditorSkeleton = () => {
  return (
    <div className="bg-white">
      <div className="flex justify-between items-center text-gray-500 text-sm md:py-5 py-2 md:mt-5">
        <div className="bg-white flex flex-wrap md:gap-3 gap-2 align-center">
          <div className="animate-pulse bg-gray-200 border border-gray-300 rounded size-7"></div>
          <div className="animate-pulse bg-gray-200 border border-gray-300 rounded size-7"></div>
          <div className="animate-pulse bg-gray-200 border border-gray-300 rounded size-7"></div>
          <div className="animate-pulse bg-gray-200 border border-gray-300 rounded size-7"></div>
          <div className="animate-pulse bg-gray-200 border border-gray-300 rounded size-7"></div>
        </div>
        <div className="text-xs flex gap-5 items-center md:relative fixed bottom-0 right-0">
          <div className="flex gap-2">
            <div className="w-20 h-2 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-12 h-2 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="w-32 h-6 rounded animate-pulse bg-gray-200"></div>
      </div>

      <div className="w-1/2 h-2 bg-gray-300 rounded mb-5 animate-pulse"></div>

      <div className="w-full h-90 bg-gray-300 rounded animate-pulse"></div>
    </div>
  );
};

export default BookEditorSkeleton;
