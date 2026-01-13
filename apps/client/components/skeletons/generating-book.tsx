const GeneratingChaptersSkeleton = () => {
  return (
    <div className="bg-white space-y-6">
      <div className="flex flex-col gap-4 mb-4 animate-pulse">
        <span className="h-4 w-24 bg-gray-300 rounded"></span>
        <span className="h-2 w-1/2 bg-gray-300 rounded"></span>
      </div>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 space-y-4 animate-pulse"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="h-4 w-24 bg-gray-300 rounded"></span>
          </div>
          <div className="space-y-2">
            <div className="h-6 w-full bg-gray-200 rounded"></div>
            <div className="h-10 w-full bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GeneratingChaptersSkeleton;
