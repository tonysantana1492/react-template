import { motion } from 'framer-motion';

export const MotionLayout = ({children}) => {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.6 }}
			animate={{ opacity: 1, scale: 1 }}
			className="h-full flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
		>
            {children}
        </motion.div>
	);
};
