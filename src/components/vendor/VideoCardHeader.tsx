import { Gift } from "lucide-react";

interface VideoCardHeaderProps {
  vendor?: {
    name: string;
    avatar: string;
    rewardPoints?: number;
  };
}

export const VideoCardHeader = ({ vendor }: VideoCardHeaderProps) => {
  if (!vendor) return null;
  
  return (
    <>
      {/* Watermark */}
      <div className="absolute top-4 right-4 text-white/80 font-semibold text-sm bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
        Vendors Connect
      </div>

      {/* Vendor Profile */}
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/30 backdrop-blur-sm p-2 rounded-full border border-white/10">
        <img
          src={vendor.avatar}
          alt={vendor.name}
          className="w-10 h-10 rounded-full border-2 border-white/20"
        />
        <div className="text-white pr-2">
          <p className="font-semibold text-sm">{vendor.name}</p>
          {vendor.rewardPoints && (
            <p className="text-xs flex items-center gap-1 text-white/80">
              <Gift className="w-3 h-3" />
              {vendor.rewardPoints} points
            </p>
          )}
        </div>
      </div>
    </>
  );
};