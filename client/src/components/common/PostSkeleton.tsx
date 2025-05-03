const PostSkeleton = () => {
  return (
    <div className="max-w-md w-full bg-white shadow-md mx-auto mb-6 text-black pb-4 rounded-md animate-pulse">
      {/* Top: user info */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300" />
          <div className="h-4 w-24 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Image placeholder */}
      <div className="w-full h-[500px] bg-gray-300" />

      {/* Action buttons */}
      <div className="flex justify-between items-center px-4 pt-4">
        <div className="flex gap-4">
          <div className="w-7 h-7 bg-gray-300 rounded-full" />
          <div className="w-7 h-7 bg-gray-300 rounded-full" />
          <div className="w-7 h-7 bg-gray-300 rounded-full" />
        </div>
        <div className="w-7 h-7 bg-gray-300 rounded" />
      </div>

      {/* Likes */}
      <div className="px-4 pt-4">
        <div className="h-4 w-24 bg-gray-300 rounded" />
      </div>

      {/* Description */}
      <div className="px-4 pt-3 space-y-2">
        <div className="h-4 w-full bg-gray-300 rounded" />
      </div>

      {/* Comments preview */}
      <div className="px-4 pt-4 space-y-2">
        <div className="h-4 w-2/3 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default PostSkeleton;
