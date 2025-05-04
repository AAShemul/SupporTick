import { useState } from 'react';

export default function Form({ onSuccess }: { onSuccess: () => void }) {
    const [form, setForm] = useState({ title: '', description: '', priority: 'medium' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to submit');
            setForm({ title: '', description: '', priority: 'medium' });
            onSuccess();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 rounded bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="text-lg font-semibold">Submit New Ticket</h2>
            {error && <p className="text-red-500">{error}</p>}
            <input
                type="text"
                className="input"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
            />
            <textarea
                className="input"
                placeholder="Describe your issue"
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
            />
            <select className="input" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button type="submit" className="btn" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Ticket'}
            </button>
        </form>
    );
}
