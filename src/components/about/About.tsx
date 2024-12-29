import React from "react"
import { Group, Share2, Clock, BookOpen, Layout, Move } from "lucide-react"

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white border-none">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Học từ vựng thông minh</h1>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto opacity-90">
              Nâng cao vốn từ vựng của bạn một cách hiệu quả với phương pháp học tập được cá nhân
              hóa
            </p>
          </div>
        </div>
        <div className="absolute bottom-[-10px] w-full">
          {/* SVG cho desktop */}
          <svg viewBox="0 0 1440 100" className="fill-current text-gray-50 hidden md:block">
            <path d="M0,50 C150,100 350,0 500,50 C650,100 800,20 1000,60 C1200,100 1400,40 1440,50 L1440,100 L0,100 Z"></path>
          </svg>

          {/* SVG cho mobile */}
          <svg viewBox="0 0 1440 100" className="fill-current text-gray-50 md:hidden">
            <path d="M0,50 C200,100 400,0 600,50 C800,100 1000,0 1200,50 C1400,100 1440,0 1440,50 L1440,100 L0,100 Z"></path>
          </svg>
        </div>

        {/* Core Features Section */}
      </div>
      <div className="container mx-auto px-4 pb-24 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1: Study Groups */}
          <div className="bg-gray-50 rounded-xl p-6 hover:transform hover:scale-105 transition-all shadow-lg">
            <div className="flex items-center mb-4">
              <Group className="w-8 h-8 mr-3 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-800">Nhóm học tập</h3>
            </div>
            <p className="text-gray-600">
              Tạo và quản lý các nhóm học phần một cách linh hoạt. Sắp xếp nhóm học phần dễ dàng
              bằng thao tác kéo thả trực quan.
            </p>
          </div>

          {/* Feature 2: Drag & Drop */}
          <div className="bg-gray-50 rounded-xl p-6 hover:transform hover:scale-105 transition-all shadow-lg">
            <div className="flex items-center mb-4">
              <Move className="w-8 h-8 mr-3 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-800">Sắp xếp linh hoạt</h3>
            </div>
            <p className="text-gray-600">
              Tổ chức các học phần từ vựng theo ý muốn với tính năng kéo thả. Dễ dàng phân loại và
              sắp xếp theo trình độ hoặc chủ đề.
            </p>
          </div>

          {/* Feature 3: Progress Tracking */}
          <div className="bg-gray-50 rounded-xl p-6 hover:transform hover:scale-105 transition-all shadow-lg">
            <div className="flex items-center mb-4">
              <Clock className="w-8 h-8 mr-3 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-800">Theo dõi tiến độ</h3>
            </div>
            <p className="text-gray-600">
              Theo dõi thời gian học tập và tiến độ chi tiết. Xem thống kê và biểu đồ trực quan về
              quá trình học tập của bạn.
            </p>
          </div>

          {/* Feature 4: Create Flashcards */}
          <div className="bg-gray-50 rounded-xl p-6 hover:transform hover:scale-105 transition-all shadow-lg">
            <div className="flex items-center mb-4">
              <BookOpen className="w-8 h-8 mr-3 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-800">Tạo học phần</h3>
            </div>
            <p className="text-gray-600">
              Tạo các học phần từ vựng tùy chỉnh với giao diện trực quan. Thêm hình ảnh, âm thanh và
              ví dụ để học hiệu quả hơn.
            </p>
          </div>

          {/* Feature 5: Share */}
          <div className="bg-gray-50 rounded-xl p-6 hover:transform hover:scale-105 transition-all shadow-lg">
            <div className="flex items-center mb-4">
              <Share2 className="w-8 h-8 mr-3 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-800">Chia sẻ & học cùng nhau</h3>
            </div>
            <p className="text-gray-600">
              Chia sẻ các học phần với cộng đồng. Học cùng nhau và tận dụng kiến thức từ những người
              học khác.
            </p>
          </div>

          {/* Feature 6: Organize */}
          <div className="bg-gray-50 rounded-xl p-6 hover:transform hover:scale-105 transition-all shadow-lg">
            <div className="flex items-center mb-4">
              <Layout className="w-8 h-8 mr-3 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-800">Tổ chức thông minh</h3>
            </div>
            <p className="text-gray-600">
              Sắp xếp các học phần theo lộ trình học tập riêng. Tự động gợi ý thứ tự học tập dựa
              trên trình độ của bạn.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
    </div>
  )
}

export default About
