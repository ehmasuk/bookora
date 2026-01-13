const ProfileBooksSkeleton = () => {
  return (
    <div className="w-full max-w-4xl bg-white rounded-lg p-4">
      <div className="flex gap-5 animate-pulse">
        <div className="flex-shrink-0 relative group">
          <div className="relative w-24 h-38 rounded-lg bg-gray-200"></div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-4 gap-2">
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-1 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button className="h-8 w-32 bg-gray-200 rounded"></button>
            <button className="h-8 w-8 bg-gray-200 rounded"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBooksSkeleton;
