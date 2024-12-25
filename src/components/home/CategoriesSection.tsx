import { motion } from "framer-motion";
import { Star, TrendingUp, Gift } from "lucide-react";

const featuredCategories = [
  { name: "Fashion", icon: <Star className="w-6 h-6" /> },
  { name: "Electronics", icon: <TrendingUp className="w-6 h-6" /> },
  { name: "Beauty", icon: <Gift className="w-6 h-6" /> },
];

export const CategoriesSection = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {featuredCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
            >
              <div className="p-4 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors mb-4">
                {category.icon}
              </div>
              <span className="text-lg font-medium">{category.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};