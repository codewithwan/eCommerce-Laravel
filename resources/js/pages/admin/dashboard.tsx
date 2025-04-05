import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { StatsCard } from '@/components/ui/stats-card';
import { Users, ShoppingBag, Store, LineChart } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
];

interface Props {
    stats?: {
        totalUsers: number;
        totalSellers: number;
        totalOrders: number;
        totalRevenue: number;
    };
}

export default function AdminDashboard(props: Props) {
    const { stats = {
        totalUsers: 0,
        totalSellers: 0,
        totalOrders: 0,
        totalRevenue: 0
    }} = props;
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Admin Header */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border overflow-hidden rounded-xl border bg-background">
                    <div className="h-32 w-full overflow-hidden bg-primary/10">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="flex flex-col md:flex-row p-6 gap-6">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-background -mt-12 bg-primary flex items-center justify-center text-white text-2xl font-bold">
                            Admin
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                            <p className="text-muted-foreground">Pusat kontrol untuk mengelola seluruh platform</p>
                        </div>
                    </div>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mb-8">
                    <StatsCard
                        title="Total Users"
                        value={stats.totalUsers}
                        icon={<Users className="h-5 w-5" />}
                        description="Semua pengguna terdaftar"
                    />
                    <StatsCard
                        title="Jumlah Seller"
                        value={stats.totalSellers}
                        icon={<Store className="h-5 w-5" />}
                        description="Penjual aktif di platform"
                    />
                    <StatsCard
                        title="Total Orders"
                        value={stats.totalOrders}
                        icon={<ShoppingBag className="h-5 w-5" />}
                        description="Pesanan di seluruh platform"
                    />
                    <StatsCard
                        title="Total Revenue"
                        value={stats.totalRevenue.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                        icon={<LineChart className="h-5 w-5" />}
                        description="Pendapatan seluruh platform"
                        valueStyle="text-green-500"
                    />
                </div>
                
                {/* Admin Action Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manajemen Pengguna</CardTitle>
                            <CardDescription>Kelola akun pengguna dan hak akses</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full">Kelola Pengguna</Button>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Manajemen Seller</CardTitle>
                            <CardDescription>Verifikasi dan kelola toko penjual</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full">Kelola Penjual</Button>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Laporan Platform</CardTitle>
                            <CardDescription>Lihat analitik dan statistik platform</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full">Lihat Laporan</Button>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="border rounded-lg p-6 bg-muted/20">
                    <h2 className="text-xl font-bold mb-4">Pengaturan Website</h2>
                    <p className="mb-4">Anda dapat mengakses pengaturan lainnya melalui menu navigasi.</p>
                    
                    <div className="flex gap-2">
                        <Button variant="outline">Pengaturan Sistem</Button>
                        <Button variant="outline">Kategori Produk</Button>
                        <Button variant="outline">Konten Website</Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 