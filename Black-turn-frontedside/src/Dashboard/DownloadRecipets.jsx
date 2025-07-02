import React, { useEffect, useState } from 'react'
import { Download, Search, Calendar, FileText, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import Sidebar from './Pages/header-sidebar/Sidebar';
import Navbar from './Pages/header-sidebar/Header';
import platform from '../assets/images/airtel.png';
import platform1 from '../assets/images/amazon music.png';
import platform2 from '../assets/images/Vector.png';
import platform3 from '../assets/images/Facebook.png';
import platform4 from '../assets/images/ganna.png';
import platform5 from '../assets/images/jiosavan.png';
import platform6 from '../assets/images/resso.png';
import platform7 from '../assets/images/spofity.png';
import platform8 from '../assets/images/vi.png';
import platform9 from '../assets/images/wynk.png';
import platform10 from '../assets/images/youtubemusic.png';
import platform11 from '../assets/images/snapchat.png';

function DownloadRecipets() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [activeTab, setActiveTab] = useState('download-reports');
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedStore, setSelectedStore] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(true);
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);

 const platforms = [
    { id: 'airtel', name: 'Airtel', icon: platform},
    { id: 'amazon-music', name: 'Amazon Music', icon:platform1 },
    { id: 'apple-music', name: 'Apple Music', icon: platform2 },
    { id: 'facebook', name: 'Facebook', icon:platform3 },
    { id: 'gaana', name: 'Gaana', icon: platform4},
    { id: 'jio-saavn', name: 'JioSaavn', icon:platform5 },
    { id: 'resso', name: 'Resso', icon: platform6 },
    { id: 'spotify', name: 'Spotify', icon: platform7 },
    { id: 'vodafone', name: 'Vodafone Idea', icon: platform8 },
    { id: 'wynk', name: 'Wynk Music', icon: platform9},
    { id: 'youtube', name: 'YouTube Music', icon:platform10 },
    { id: 'snapchat', name: 'Snapchat', icon: platform11 },
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = ['2024', '2023', '2022', '2021', '2020'];
  const stores = ['All Stores', 'Store 1', 'Store 2', 'Store 3', 'Store 4'];

  const generateSampleData = () => {
        const sampleData = [];
        const selectedPlatformData = selectedPlatforms.length > 0 ? 
            platforms.filter(p => selectedPlatforms.includes(p.id)) : platforms;

        selectedPlatformData.forEach(platform => {
            if (selectedMonth && selectedYear) {
                sampleData.push({
                    id: `${platform.id}-${selectedMonth}-${selectedYear}`,
                    platform: platform.name,
                    month: selectedMonth,
                    year: selectedYear,
                    downloads: Math.floor(Math.random() * 10000) + 1000,
                    streams: Math.floor(Math.random() * 100000) + 10000,
                    revenue: (Math.random() * 5000 + 500).toFixed(2)
                });
            }
        });

        return sampleData;
    };

    useEffect(() => {
        if (selectedMonth && selectedYear && selectedPlatforms.length > 0) {
            setLoading(true);
            setTimeout(() => {
                setReportData(generateSampleData());
                setLoading(false);
            }, 500);
        } else {
            setReportData([]);
        }
    }, [selectedPlatforms, selectedMonth, selectedYear]);

    const handlePlatformToggle = (platformId) => {
        setSelectedPlatforms(prev => 
            prev.includes(platformId) 
                ? prev.filter(id => id !== platformId)
                : [...prev, platformId]
        );
    };

 


    // Function to load jsPDF dynamically
    const loadJsPDF = async () => {
        if (window.jsPDF) {
            return window.jsPDF;
        }

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = () => {
                resolve(window.jspdf.jsPDF);
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    };

    // Function to generate and download PDF directly
  
const downloadPDF = async () => {
  try {
    const filteredData = reportData.filter(item =>
      item.platform.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredData.length === 0) {
      alert('No data available to download');
      return;
    }

    const jsPDF = await loadJsPDF();
    const doc = new jsPDF();

    const primaryColor = [14, 116, 144];
    const lightGray = [248, 250, 252];
    const darkGray = [55, 65, 81];
    const borderGray = [209, 213, 219];
    const textGray = [107, 114, 128];

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;

    const currentDate = new Date().toLocaleDateString('en-US');
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    // === Header ===
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textGray[0], textGray[1], textGray[2]);
    doc.text(`${currentDate}, ${currentTime}`, margin, 10);
    doc.text('Download Report - October 2022', pageWidth / 2, 10, { align: 'center' });

    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(`Platform Reports - ${selectedMonth} ${selectedYear}`, pageWidth / 2, 30, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textGray[0], textGray[1], textGray[2]);
    doc.text(`Generated on: ${currentDate}`, pageWidth / 2, 40, { align: 'center' });
    doc.text(`Selected Platforms: ${selectedPlatforms.length} platforms`, pageWidth / 2, 50, { align: 'center' });

    // Divider
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(1.5);
    doc.line(margin, 60, pageWidth - margin, 60);

    // === Report Summary ===
    let yPos = 75;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('Report Summary', margin, yPos);

    yPos += 15;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text(`Period:`, margin, yPos);
    doc.text(`${selectedMonth} ${selectedYear}`, margin + 50, yPos);

    yPos += 12;
    doc.text(`Total Platforms:`, margin, yPos);
    doc.text(`${selectedPlatforms.length}`, margin + 50, yPos);

    yPos += 12;
    doc.text(`Report Generated:`, margin, yPos);
    doc.text(`${currentDate}, ${currentTime}`, margin + 50, yPos);

    const totalDownloads = filteredData.reduce((sum, item) => sum + item.downloads, 0);

    yPos += 25;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(textGray[0], textGray[1], textGray[2]);
    doc.text('Total Summary', margin, yPos);

    yPos += 15;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Total Downloads:', margin, yPos);
    doc.text(totalDownloads.toLocaleString(), pageWidth - margin, yPos, { align: 'right' });

    // === Table Setup ===
    yPos += 25;
    const rowHeight = 15;
    const headers = ['Platform', 'Month', 'Year', 'Downloads'];
    const colWidths = [70, 40, 30, 40]; // Sum ~180 with margin
    const colPositions = [margin];

    for (let i = 0; i < colWidths.length - 1; i++) {
      colPositions.push(colPositions[i] + colWidths[i]);
    }

    // Header Row
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);

    headers.forEach((header, i) => {
      const x = colPositions[i];
      doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
      doc.rect(x, yPos, colWidths[i], rowHeight, 'FD');
      doc.text(header, x + 2, yPos + 10);
    });

    yPos += rowHeight;

    // === Data Rows ===
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');

    filteredData.forEach((row, index) => {
      if (yPos > pageHeight - 50) {
        addSimpleFooter(doc, pageHeight);
        doc.addPage();
        yPos = 30;

        // Redraw header
        headers.forEach((header, i) => {
          const x = colPositions[i];
          doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
          doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
          doc.rect(x, yPos, colWidths[i], rowHeight, 'FD');
          doc.text(header, x + 2, yPos + 10);
        });

        yPos += rowHeight;
      }

      const rowData = [
        row.platform,
        row.month,
        row.year.toString(),
        row.downloads.toLocaleString()
      ];

      rowData.forEach((data, i) => {
        const x = colPositions[i];
        doc.setFillColor(index % 2 === 0 ? 255 : 252, 255, 255);
        doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
        doc.rect(x, yPos, colWidths[i], rowHeight, 'FD');
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        doc.text(data.toString(), x + 2, yPos + 10);
      });

      yPos += rowHeight;
    });

    // === Footer Text ===
    const footerY = pageHeight - 25;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textGray[0], textGray[1], textGray[2]);
    doc.text('This report was automatically generated from the Download Reports system.', pageWidth / 2, footerY, { align: 'center' });
    doc.text('For questions or support, please contact your system administrator.', pageWidth / 2, footerY + 10, { align: 'center' });

    // === Page Numbers ===
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      addSimpleFooter(doc, pageHeight, i, totalPages);
    }

    doc.save(`platform-report-${selectedMonth}-${selectedYear}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};

// Add consistent page footer
const addSimpleFooter = (doc, pageHeight, pageNum = 1, totalPages = 1) => {
  const textGray = [107, 114, 128];
  const borderGray = [209, 213, 219];

  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.setLineWidth(0.5);
  doc.line(20, pageHeight - 35, doc.internal.pageSize.width - 20, pageHeight - 35);

  if (totalPages > 1) {
    doc.setTextColor(textGray[0], textGray[1], textGray[2]);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`Page ${pageNum} of ${totalPages}`, doc.internal.pageSize.width - 40, pageHeight - 20);
  }
};

    const downloadExcel = () => {
        const filteredData = reportData.filter(item =>
            item.platform.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const csvContent = [
            ['Platform', 'Month', 'Year', 'Downloads'],
            ...filteredData.map(row => [row.platform, row.month, row.year, row.downloads, row.streams, row.revenue])
        ].map(row => row.join(',')).join('\n');

        const element = document.createElement('a');
        const file = new Blob([csvContent], { type: 'text/csv' });
        element.href = URL.createObjectURL(file);
        element.download = `report-${selectedMonth}-${selectedYear}.csv`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

const downloadYearwise = async () => {
  if (!selectedYear) {
    alert('Please select a year first.');
    return;
  }

  try {
    const yearlyData = [];
    const selectedPlatformData = selectedPlatforms.length > 0
      ? platforms.filter(p => selectedPlatforms.includes(p.id))
      : platforms;

    months.forEach(month => {
      selectedPlatformData.forEach(platform => {
        yearlyData.push({
          platform: platform.name,
          month,
          year: selectedYear,
          downloads: Math.floor(Math.random() * 10000) + 1000,
        });
      });
    });

    const jsPDF = await loadJsPDF();
    const doc = new jsPDF();

    const primaryColor = [14, 116, 144];
    const lightGray = [248, 250, 252];
    const textGray = [107, 114, 128];
    const darkGray = [55, 65, 81];
    const borderGray = [209, 213, 219];
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;

    const currentDate = new Date().toLocaleDateString('en-US');

    // Header
    doc.setFontSize(10);
    doc.setTextColor(textGray[0], textGray[1], textGray[2]);
    doc.text(currentDate, margin, 10);
    doc.text(`Annual Report - ${selectedYear}`, pageWidth / 2, 10, { align: 'center' });

    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(`Annual Platform Report - ${selectedYear}`, pageWidth / 2, 30, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textGray[0], textGray[1], textGray[2]);
    doc.text(`Generated on: ${currentDate}`, pageWidth / 2, 40, { align: 'center' });
    doc.text(`Platforms analyzed: ${selectedPlatformData.length}`, pageWidth / 2, 50, { align: 'center' });
    doc.text(`Total data points: ${yearlyData.length}`, pageWidth / 2, 60, { align: 'center' });

    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(2);
    doc.line(margin, 70, pageWidth - margin, 70);

    // Table
    let yPos = 85;
    const rowHeight = 15;
    const headers = ['Platform', 'Month', 'Year', 'Downloads'];
    const colWidths = [50, 40, 25, 40];
    const colPositions = [margin];
    for (let i = 0; i < colWidths.length - 1; i++) {
      colPositions.push(colPositions[i] + colWidths[i]);
    }

    const drawTableHeader = () => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      headers.forEach((header, i) => {
        const x = colPositions[i];
        doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
        doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
        doc.rect(x, yPos, colWidths[i], rowHeight, 'FD');
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        doc.text(header, x + 2, yPos + 10);
      });
      yPos += rowHeight;
    };

    drawTableHeader();

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    yearlyData.forEach((row, index) => {
      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = 20;
        drawTableHeader();
      }

      const rowData = [row.platform, row.month, row.year.toString(), row.downloads.toLocaleString()];
      rowData.forEach((data, i) => {
        const x = colPositions[i];
        doc.setFillColor(index % 2 === 0 ? 255 : 252, 252, 252);
        doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
        doc.rect(x, yPos, colWidths[i], rowHeight, 'FD');
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        doc.text(data.toString(), x + 2, yPos + 10);
      });

      yPos += rowHeight;
    });

    doc.save(`annual-report-${selectedYear}.pdf`);
  } catch (error) {
    console.error('Error generating yearly PDF:', error);
    alert('Error generating yearly PDF. Please try again.');
  }
};


  const downloadStorewise = async () => {
  if (!selectedStore) {
    alert('Please select a store first.');
    return;
  }

  try {
    const storeData = [];
    const selectedPlatformData = selectedPlatforms.length > 0
      ? platforms.filter(p => selectedPlatforms.includes(p.id))
      : platforms;

    months.forEach(month => {
      selectedPlatformData.forEach(platform => {
        storeData.push({
          platform: platform.name,
          month,
          year: selectedYear || '2024',
          store: selectedStore,
          downloads: Math.floor(Math.random() * 10000) + 1000,
          streams: Math.floor(Math.random() * 100000) + 10000,
          revenue: (Math.random() * 5000 + 500).toFixed(2)
        });
      });
    });

    const jsPDF = await loadJsPDF();
    const doc = new jsPDF();

    const primaryColor = [14, 116, 144];
    const lightGray = [248, 250, 252];
    const textGray = [107, 114, 128];
    const darkGray = [55, 65, 81];
    const borderGray = [209, 213, 219];
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;

    const currentDate = new Date().toLocaleDateString('en-US');

    doc.setFontSize(10);
    doc.setTextColor(textGray[0], textGray[1], textGray[2]);
    doc.text(`${currentDate}`, margin, 10);
    doc.text(`Store Analytics`, pageWidth / 2, 10, { align: 'center' });

    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(`Store Report - ${selectedStore}`, pageWidth / 2, 30, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textGray[0], textGray[1], textGray[2]);
    doc.text(`Generated on: ${currentDate}`, pageWidth / 2, 45, { align: 'center' });
    doc.text(`Analysis Period: ${selectedYear || '2024'}`, pageWidth / 2, 55, { align: 'center' });

    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(2);
    doc.line(margin, 65, pageWidth - margin, 65);

    // Table
    let yPos = 80;
    const rowHeight = 15;
    const headers = ['Platform', 'Month', 'Year', 'Downloads', 'Streams', 'Revenue ($)'];
    const colWidths = [35, 30, 20, 30, 35, 35];
    const colPositions = [margin];
    for (let i = 0; i < colWidths.length - 1; i++) {
      colPositions.push(colPositions[i] + colWidths[i]);
    }

    const drawHeader = () => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      headers.forEach((header, i) => {
        const x = colPositions[i];
        doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
        doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
        doc.rect(x, yPos, colWidths[i], rowHeight, 'FD');
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        doc.text(header, x + 2, yPos + 10);
      });
      yPos += rowHeight;
    };

    drawHeader();

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    storeData.forEach((row, index) => {
      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = 20;
        drawHeader();
      }

      const rowData = [
        row.platform,
        row.month,
        row.year.toString(),
        row.downloads.toLocaleString(),
        row.streams.toLocaleString(),
        row.revenue
      ];

      rowData.forEach((data, i) => {
        const x = colPositions[i];
        doc.setFillColor(index % 2 === 0 ? 255 : 252, 252, 252);
        doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
        doc.rect(x, yPos, colWidths[i], rowHeight, 'FD');
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        doc.text(data.toString(), x + 2, yPos + 10);
      });

      yPos += rowHeight;
    });

    doc.save(`store-analytics-${selectedStore.replace(/\s+/g, '-').toLowerCase()}.pdf`);
  } catch (error) {
    console.error('Error generating store PDF:', error);
    alert('Error generating store PDF. Please try again.');
  }
};


    const filteredData = reportData.filter(item =>
        item.platform.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
        setUnreadCount(prev => prev - 1);
    };

  return (
    <>
         <div className="min-h-screen flex bg-gray-50">
            <Sidebar
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        // onCloseSidebar={closeSideba.r}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <div className="sticky top-0 z-50">
                  <Navbar
                    toggleSidebar={toggleSidebar}
                    sidebarOpen={isSidebarOpen}
                    notifications={notifications}
                    unreadCount={unreadCount}
                    markAsRead={markAsRead}
                  />
                </div>
                
        <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Download Reports</h1>
        <p className="text-gray-600">Select platforms, time period, and download your reports</p>
      </div>

      {/* Download Options */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Download Options</h2>
        <div className="space-y-3">
          <div className="flex items-center text-gray-700">
            <span className="w-6 h-6 bg-[#005f73] text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">1</span>
            <span>Select Platform and Month-Year to download.</span>
          </div>
          <div className="flex items-center text-gray-700">
            <span className="w-6 h-6 bg-[#005f73] text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">2</span>
            <span>Download Entire Year or Complete Store Reports.</span>
          </div>
        </div>
      </div>

      {/* Platform Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Select Platforms</h2>
         
           
         
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className={`relative p-4 rounded-lg  cursor-pointer transition-all `}
              onClick={() => handlePlatformToggle(platform.id)}
            >
              <div className="text-center">
                <div className="group w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-xl bg-white shadow-md border border-gray-200 hover:shadow-lg transition-shadow">

                <img src={platform.icon} alt="" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                </div>
                {/* <div className={`w-12 h-12 ${platform.color} rounded-lg flex items-center justify-center text-white text-xl mb-2 mx-auto`}>
                  
                </div> */}
                {/* <h3 className="text-sm font-medium text-gray-900 mb-2">{platform.name}</h3>
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={selectedPlatforms.includes(platform.id)}
                    onChange={() => handlePlatformToggle(platform.id)}
                    className="w-4 h-4 text-[#005f73] bg-gray-100 border-gray-300 rounded focus:ring-[#005f73] focus:ring-2"
                  />
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Month
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73]"
              >
                <option value="">Select Month</option>
                {months.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73]"
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-1" />
                Store
              </label>
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73]"
              >
                <option value="">Select Store</option>
                {stores.map((store) => (
                  <option key={store} value={store}>{store}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="w-4 h-4 inline mr-1" />
                Search
              </label>
              <input
                type="text"
                placeholder="Search platforms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Report Data</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#005f73] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Platform</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Month</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Year</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Downloads</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#005f73] mr-2"></div>
                      Loading data...
                    </div>
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    {selectedPlatforms.length === 0 || !selectedMonth || !selectedYear
                      ? 'Please select platforms, month, and year to view data'
                      : 'No data available'
                    }
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.platform}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{row.month}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{row.year}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{row.downloads.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredData.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-gray-700">
                Showing {filteredData.length} entries
              </div>
              <div className="flex gap-2">
                <button
                  onClick={downloadPDF}
                  className="flex items-center gap-2 px-4 py-2 bg-[#005f73] text-white rounded-lg hover:bg-[#004d5c] transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button
                  onClick={downloadExcel}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Excel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Download Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Download Entire Year Reports</h3>
          <div className="space-y-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73]"
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <button
              onClick={downloadYearwise}
              disabled={!selectedYear}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#005f73] text-white rounded-lg hover:bg-[#004d5c] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Download Yearwise
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Download Entire Store Reports</h3>
          <div className="space-y-4">
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73]"
            >
              <option value="">Select Store</option>
              {stores.map((store) => (
                <option key={store} value={store}>{store}</option>
              ))}
            </select>
            <button
              onClick={downloadStorewise}
              disabled={!selectedStore}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Download Storewise
            </button>
          </div>
        </div>
      </div>
    </div>

      </div>
         </div>
    </>
  )
}

export default DownloadRecipets