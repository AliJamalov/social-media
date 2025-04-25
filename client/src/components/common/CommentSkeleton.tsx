const CommentSkeleton = () => {
  return (
    <div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col animate-pulse space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-[40px] h-[40px] bg-gray-300 rounded-full" />
            <div className="h-4 bg-gray-300 rounded w-1/4" />
          </div>
          <div className="h-3 bg-gray-200 rounded w-3/4" />
        </div>
      ))}
    </div>
  );
};

export default CommentSkeleton;
