import { motion } from 'motion/react';

export default function TicketCard({ ticket }: { ticket: any }) {
    return (
        <motion.div
            className="rounded bg-white p-4 shadow dark:bg-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h3 className="text-lg font-bold">{ticket.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{ticket.description}</p>
            <p className="mt-2 text-xs text-gray-500">Priority: {ticket.priority}</p>
            <p className="text-xs text-gray-400">Status: {ticket.status}</p>
        </motion.div>
    );
}
