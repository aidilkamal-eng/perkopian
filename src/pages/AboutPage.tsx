import React from 'react';
import { Coffee, Users, Star, MapPin, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-amber-50">
      {/* Hero Section */}
      <section className="relative bg-amber-800 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg" 
            alt="Coffee shop interior" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Coffee className="h-16 w-16 mx-auto mb-6 text-amber-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tentang Perkopian</h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            Membantu kamu menemukan warkop terbaik untuk kebutuhanmu.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Misi Kami</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Kami percaya bahwa setiap orang berhak mendapatkan tempat yang nyaman untuk bekerja, belajar, atau sekadar bersantai. Perkopian hadir untuk membantu kamu menemukan warkop yang sesuai dengan kebutuhanmu.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Komunitas</h3>
              <p className="text-gray-600">
                Membangun komunitas yang saling berbagi informasi dan pengalaman tentang warkop.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Kualitas</h3>
              <p className="text-gray-600">
                Memberikan informasi yang akurat dan terpercaya tentang fasilitas dan kualitas warkop.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Aksesibilitas</h3>
              <p className="text-gray-600">
                Memudahkan pencarian warkop berdasarkan lokasi dan kebutuhan spesifik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Cerita Kami</h2>
              <p className="text-gray-600 mb-4">
                Perkopian bermula dari kesulitan kami menemukan warkop yang cocok untuk bekerja. Setiap warkop memiliki karakteristik yang berbeda, dan tidak semua cocok untuk kebutuhan yang sama.
              </p>
              <p className="text-gray-600 mb-4">
                Kami memulai dengan mengumpulkan data dan review dari berbagai warkop di kota-kota besar Indonesia. Seiring waktu, komunitas kami tumbuh dan semakin banyak orang yang berbagi pengalaman mereka.
              </p>
              <p className="text-gray-600">
                Hari ini, Perkopian telah membantu ribuan orang menemukan warkop ideal untuk kebutuhan mereka, dari mahasiswa yang mencari tempat belajar hingga pekerja remote yang membutuhkan koneksi internet stabil.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg" 
                alt="Coffee shop interior 1" 
                className="w-full h-64 object-cover rounded-lg"
              />
              <img 
                src="https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg" 
                alt="Coffee shop interior 2" 
                className="w-full h-64 object-cover rounded-lg"
              />
              <img 
                src="https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg" 
                alt="Coffee shop interior 3" 
                className="w-full h-64 object-cover rounded-lg"
              />
              <img 
                src="https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg" 
                alt="Coffee shop interior 4" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nilai-Nilai Kami</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Kami berkomitmen untuk memberikan pengalaman terbaik bagi pengguna dan mitra warkop kami.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Transparansi</h3>
              <p className="text-gray-600">
                Review dan rating yang jujur dan dapat diverifikasi.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Inklusivitas</h3>
              <p className="text-gray-600">
                Warkop untuk semua kalangan dan kebutuhan.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Inovasi</h3>
              <p className="text-gray-600">
                Terus mengembangkan fitur yang bermanfaat.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Komunitas</h3>
              <p className="text-gray-600">
                Membangun ekosistem yang saling mendukung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Bergabung dengan Komunitas Kami</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Jadilah bagian dari komunitas pencinta warkop dan bantu orang lain menemukan tempat favorit mereka.
          </p>
          <button className="bg-white text-amber-600 hover:bg-amber-50 px-8 py-3 rounded-lg font-medium text-lg transition-colors">
            Daftar Sekarang
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;