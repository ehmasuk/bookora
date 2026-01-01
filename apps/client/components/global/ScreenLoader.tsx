function ScreenLoader() {
  return (
    <div className="fixed animate-in left-0 top-0 grid place-items-center h-screen w-screen bg-[#ffffff8d] dark:bg-[#1e29399a]">
      <div className="relative w-[50px] aspect-square rounded-full border-8 border-transparent border-r-[#007bff] animate-spin" style={{ animationDirection: "1s" }}>
        <div className="absolute -inset-2 rounded-full border-8 border-transparent border-r-[#007bff] animate-spin" style={{ animationDirection: "2s" }}></div>
        <div className="absolute -inset-2 rounded-full border-8 border-transparent border-r-[#007bff] animate-spin" style={{ animationDirection: "4s" }}></div>
      </div>
    </div>
  );
}

export default ScreenLoader;
