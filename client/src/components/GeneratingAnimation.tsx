import { motion } from "framer-motion";
import { Sparkles, Code2, Cpu, Zap } from "lucide-react";

export function GeneratingAnimation() {
  const icons = [Sparkles, Code2, Cpu, Zap];

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Sparkles className="h-10 w-10 text-primary-foreground" />
        </motion.div>
      </div>

      <div className="flex gap-3">
        {icons.map((Icon, index) => (
          <motion.div
            key={index}
            className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center"
            animate={{
              y: [0, -8, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          >
            <Icon className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        ))}
      </div>

      <div className="text-center space-y-2">
        <motion.h3
          className="font-semibold text-lg"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Gerando seu sistema...
        </motion.h3>
        <p className="text-sm text-muted-foreground max-w-md">
          A IA está analisando seu prompt e criando o código otimizado para sua aplicação
        </p>
      </div>
    </div>
  );
}
