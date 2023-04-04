import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Principal = () => {
  return (
    <>
      <Navbar/>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 text-center mb-8">Bienvenido a nuestra abarrotería</h1>
          <p className="text-lg text-gray-600 text-center max-w-xl mb-12">Tenemos una amplia selección de productos de alta calidad a precios competitivos. ¡Ven a visitarnos hoy mismo!</p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 m-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden w-full md:w-1/3">
            <img className="w-full h-48 object-cover" src="https://www.cardamomo.news/__export/1652826752334/sites/debate/img/2022/05/17/frutas_y_verduras.png_976912859.png" alt="Imagen de frutas y verduras"/>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Frutas y verduras frescas</h3>
              <p className="text-gray-600 text-sm mb-4">Ofrecemos una amplia variedad de frutas y verduras frescas de temporada para que puedas disfrutar de alimentos saludables y deliciosos.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden w-full md:w-1/3">
            <img className="w-full h-48 object-cover" src="https://curiosfera-recetas.com/wp-content/uploads/2016/06/Como-conservar-el-pan.jpg" alt="Imagen de pan fresco"/>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Pan fresco todos los días</h3>
              <p className="text-gray-600 text-sm mb-4">Nuestro panadero trabaja duro cada día para ofrecerte una amplia selección de pan fresco, desde pan blanco y pan integral hasta pan de centeno y mucho más.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden w-full md:w-1/3">
            <img className="w-full h-48 object-cover" src="https://t2.uc.ltmcdn.com/es/posts/7/4/9/como_elegir_la_carne_fresca_24947_orig.jpg" alt="Imagen de carne fresca" />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Carne fresca y de calidad</h3>
              <p className="text-gray-600 text-sm mb-4">Nuestros cortes de carne son de la mejor calidad, provenientes de proveedores locales y siempre frescos. Ven y descubre nuestra selección de carnes hoy mismo.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden w-full md:w-1/3">
            <img className="w-full h-48 object-cover" src="https://www.hogarmania.com/archivos/202012/mejores-productos-de-limpieza-de-este-ano-1280x720x80xX.jpg" alt="Imagen de productos de limpieza" />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Productos de limpieza de alta calidad</h3>
              <p className="text-gray-600 text-sm mb-4">Ofrecemos una amplia variedad de productos de limpieza de alta calidad, desde detergentes y limpiadores hasta papel higiénico y mucho más. ¡Ven y descubre nuestra selección hoy mismo!</p>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default Principal;