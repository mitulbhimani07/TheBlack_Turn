import React, { useState, useEffect } from 'react';
import Sidebar from './header-sidebar/Sidebar';
import Navbar from './header-sidebar/Header';

// Chart.js imports FIRST
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Doughnut, PolarArea } from 'react-chartjs-2';
import { ArcElement, RadialLinearScale } from 'chart.js';

ChartJS.register(ArcElement, RadialLinearScale);

// Register all chart elements
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const platforms = [
    'Airtel', 'Amazon', 'Apple', 'Facebook', 'Gaana', 'Jio', 'Resso', 'Spotify',
    'Vodafone', 'Wynk', 'Tik Tok', 'YouTube', 'Total',
];

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];
const years = ['2024', '2023', '2022', '2021', '2020'];

export default function EarningsTrends() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');
    const [isMobile, setIsMobile] = useState(false);
    const [selectedYear, setSelectedYear] = useState('2024');

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
        setUnreadCount(prev => prev - 1);
    };

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (mobile) {
                setIsSidebarOpen(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Line Chart: Top 5 Months
    const lineChartData = {
        labels: months,
        datasets: [
            {
                label: 'Royalty Earnings (₹)',
                data: [65, 59, 80, 81, 56, 55, 40, 70, 90, 100, 120, 130],
                fill: false,
                borderColor: '#004d66',
                backgroundColor: '#BB3E00',
                tension: 0.3,
                pointRadius: 5,
                pointBackgroundColor: '#BB3E00',
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#333',
                },
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#333',
                    maxRotation: 45,
                    minRotation: 0,
                },
            },
            y: {
                ticks: {
                    color: '#333',
                },
            },
        },
    };

    // Bar Chart: Top Platforms
    const topPlatformChartData = {
        labels: platforms,
        datasets: [
            {
                label: 'Royalty Earnings (₹)',
                data: [1200, 1100, 950, 880, 800, 900, 736, 56, 673, 94, 500, 450, 400],
                backgroundColor: '#005d71',
                borderRadius: 4,
                barThickness: 10,
            },
        ],
    };

    const topPlatformChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#333',
                    font: { size: 12 },
                },
            },
        },
        scales: {
            x: {
                ticks: { 
                    color: '#333',
                    maxRotation: 45,
                    minRotation: 0,
                },
                grid: { display: false },
            },
            y: {
                ticks: { color: '#333' },
                grid: { borderDash: [4] },
            },
        },
    };

    const doughnutChartData = {
        labels: years,
        datasets: [
            {
                label: 'Royalty Share (%)',
                data: [30, 25, 20, 15, 10],
                backgroundColor: ['#004d66', '#BB3E00', '#f59e0b', '#10b981', '#6366f1'],
                borderColor: '#fff',
                borderWidth: 2,
            },
        ],
    };

    const doughnutChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    const top5MonthsChartData = {
        labels: ['March', 'July', 'May', 'August', 'January'],
        datasets: [
            {
                label: 'Total Royalty Earnings (₹)',
                data: [3200, 3000, 2800, 2700, 2600],
                backgroundColor: '#004d66',
                hoverBackgroundColor: 'rgba(255, 99, 132, 9.2)',
                borderRadius: 0,
                barThickness: 80,
            },
        ],
    };

    const monthlyEarningsLabels = months;

    const monthlyEarningsData = {
        labels: monthlyEarningsLabels,
        datasets: [
            {
                label: 'Airtel',
                data: [300, 320, 340, 360, 380, 390, 410, 430, 450, 470, 490, 510],
                backgroundColor: '#FF6384',
            },
            {
                label: 'Amazon',
                data: [280, 300, 310, 320, 330, 345, 355, 370, 220, 230, 250, 265],
                backgroundColor: '#36A2EB',
            },
            {
                label: 'Apple',
                data: [260, 275, 290, 305, 315, 325, 335, 350, 450, 470, 290, 110],
                backgroundColor: '#FFCE56',
            },
            {
                label: 'Facebook',
                data: [240, 255, 270, 280, 295, 310, 325, 340, 325, 335, 350, 210],
                backgroundColor: '#4BC0C0',
            },
            {
                label: 'Gaana',
                data: [220, 230, 250, 265, 275, 285, 300, 310, 310, 320, 330, 345],
                backgroundColor: '#9966FF',
            },
            {
                label: 'Jio',
                data: [210, 225, 240, 255, 270, 285, 295, 305, 450, 470, 490, 510],
                backgroundColor: '#FF9F40',
            },
            {
                label: 'Resso',
                data: [190, 200, 215, 230, 240, 250, 260, 275, 240, 255, 270, 285],
                backgroundColor: '#E7E9ED',
            },
            {
                label: 'Spotify',
                data: [500, 550, 600, 620, 590, 610, 700, 750, 450, 470, 490, 510],
                backgroundColor: '#004d66',
            },
            {
                label: 'Vodafone',
                data: [180, 195, 205, 220, 230, 240, 250, 260, 165, 180, 190, 200],
                backgroundColor: '#C9CBCF',
            },
            {
                label: 'Wynk',
                data: [160, 170, 185, 200, 210, 220, 230, 245, 480, 500, 550, 580],
                backgroundColor: '#F56F3A',
            },
            {
                label: 'Tik Tok',
                data: [140, 150, 165, 180, 190, 200, 210, 220, 220, 230, 250, 265],
                backgroundColor: '#000000',
            },
            {
                label: 'YouTube',
                data: [480, 500, 550, 580, 560, 570, 640, 690, 240, 255, 270, 285],
                backgroundColor: '#BB3E00',
            },
        ],
    };

    const monthlyEarningsOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#333',
                    usePointStyle: true,
                    boxWidth: 12,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#333',
                    maxRotation: 45,
                    minRotation: 0,
                },
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    color: '#333',
                },
                grid: {
                    borderDash: [4],
                },
            },
        },
    };

    const top5MonthsChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#333',
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#333',
                },
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    color: '#333',
                },
                grid: {
                    borderDash: [4],
                },
            },
        },
    };

    const platformWiseTotalEarningsData = {
        labels: [
            'Airtel (₹)',
            'Amazon (₹)',
            'Apple (₹)',
            'Facebook (₹)',
            'Gaana (₹)',
            'Jio (₹)',
            'Resso (₹)',
            'Spotify (₹)',
            'Vodafone (₹)',
            'Wynk (₹)',
            'TikTok (₹)',
            'YouTube (₹)',
        ],
        datasets: [
            {
                label: 'Total Earnings (₹)',
                data: [1200, 1350, 800, 950, 600, 770, 500, 1800, 900, 650, 550, 2100],
                backgroundColor: 'rgba(255, 99, 132, 0.4)',
                borderColor: '#004d66',
                borderWidth: 2,
                type: 'line',
                fill: true,
                pointBackgroundColor: '#BB3E00',
                pointRadius: 10,
            },
        ],
    };

    const platformWiseTotalEarningsOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#333' },
            },
        },
        scales: {
            x: {
                ticks: { 
                    color: '#333',
                    maxRotation: 45,
                    minRotation: 0,
                },
            },
            y: {
                ticks: { color: '#333' },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="min-h-screen flex bg-gray-50 relative">
            <Sidebar
                isOpen={isSidebarOpen}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <div className="flex-1 flex flex-col min-h-screen">
                {/* Sticky Header */}
                <div className="sticky top-0 z-50">
                    <Navbar
                        toggleSidebar={toggleSidebar}
                        sidebarOpen={isSidebarOpen}
                        notifications={notifications}
                        unreadCount={unreadCount}
                        markAsRead={markAsRead}
                    />
                </div>

                <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#004d66] mb-6 tracking-tight">
                        Earning Trends & Analytics
                    </h1>

                    {/* Royalty Table */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-6">
                        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#BB3E00]">
                            Song Earning (Royalty) Reports
                        </h2>

                        <div className="mb-4 sm:mb-6">
                            <label className="font-medium text-gray-700 mr-2 text-sm sm:text-base">Year:</label>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004d66]"
                            >
                                <option>2024</option>
                                <option>2023</option>
                                <option>2022</option>
                            </select>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-center text-xs sm:text-sm text-gray-700">
                                <thead className="bg-[#f5f8fa] text-[#004d66] font-semibold border-b">
                                    <tr>
                                        <th className="border px-2 sm:px-4 py-2 sm:py-3 bg-[#004d66] text-white sticky left-0 z-10 min-w-[80px]">Month</th>
                                        {platforms.map((p, i) => (
                                            <th key={i} className="border px-2 sm:px-4 py-2 sm:py-3 bg-[#004d66] text-white whitespace-nowrap min-w-[70px]">
                                                {p}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {months.map((month, idx) => (
                                        <tr key={idx} className="hover:bg-[#f9f9f9] transition duration-200">
                                            <td className="border px-2 sm:px-4 py-2 font-medium text-gray-800 sticky left-0 bg-white z-10">{month}</td>
                                            {platforms.map((_, i) => (
                                                <td key={i} className="border px-2 sm:px-4 py-2 text-gray-700">0</td>
                                            ))}
                                        </tr>
                                    ))}
                                    <tr className="bg-[#f5f8fa] font-bold">
                                        <td className="border px-2 sm:px-4 py-2 sm:py-3 text-[#004d66] sticky left-0 bg-[#f5f8fa] z-10">Total</td>
                                        {platforms.map((_, i) => (
                                            <td key={i} className="border px-2 sm:px-4 py-2 sm:py-3 text-[#004d66]">0.00</td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Line Chart */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#BB3E00]">
                                2024 : Top 5 Months with Highest Royalty
                            </h2>
                            <div className="w-full h-64 sm:h-80">
                                <Line data={lineChartData} options={lineChartOptions} />
                            </div>
                        </div>

                        {/* Bar Chart */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#BB3E00]">
                                2024 : Top 5 Platforms with Highest Royalty
                            </h2>
                            <div className="w-full h-64 sm:h-80">
                                <Bar data={topPlatformChartData} options={topPlatformChartOptions} />
                            </div>
                        </div>
                    </div>

                    {/* Monthly Earnings Comparison */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-6">
                        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#BB3E00]">
                            2024 : Monthly Earnings Comparison (₹)
                        </h2>
                        <div className="w-full h-64 sm:h-80">
                            <Bar data={monthlyEarningsData} options={monthlyEarningsOptions} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Doughnut Chart */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#BB3E00]">
                                Yearly Royality (Earnings) Overview
                            </h2>
                            <div className="w-full h-64 sm:h-80">
                                <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
                            </div>
                        </div>

                        {/* Top 5 Months Bar Chart */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#BB3E00]">
                                (All Years) Top 5 Months with Highest Earnings
                            </h2>
                            <div className="w-full h-64 sm:h-80">
                                <Bar data={top5MonthsChartData} options={top5MonthsChartOptions} />
                            </div>
                        </div>
                    </div>

                    {/* Platform-Wise Total Earnings */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
                        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#BB3E00]">
                            (All Years) Platform-Wise Total Earnings
                        </h2>
                        <div className="w-full h-64 sm:h-80">
                            <Bar data={platformWiseTotalEarningsData} options={platformWiseTotalEarningsOptions} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}