import { Layout } from '../components/Layout';
import { useAuth } from '../hooks/useAuth';

export const Dashboard = () => {
    const { user } = useAuth();

    return (
        <Layout>
            <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-100 p-4 rounded-lg">
                        <h2 className="text-lg font-semibold">Welcome</h2>
                        <p className="text-2xl">{user?.name}</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg">
                        <h2 className="text-lg font-semibold">Role</h2>
                        <p className="text-2xl capitalize">{user?.role}</p>
                    </div>
                    <div className="bg-purple-100 p-4 rounded-lg">
                        <h2 className="text-lg font-semibold">Email</h2>
                        <p className="text-lg">{user?.email}</p>
                    </div>
                </div>

                {user?.role === 'admin' && (
                    <div className="mt-6">
                        <h2 className="text-xl font-bold mb-4">Admin Actions</h2>
                        <div className="flex gap-4">
                            <a
                                href="/admin/drivers"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Manage Drivers
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};