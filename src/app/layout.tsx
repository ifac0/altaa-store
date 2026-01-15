import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ShoppingBag, Menu, Search, User } from "lucide-react"; // Certifique-se de ter lucide-react instalado

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Altaa Store | Seu E-commerce Favorito",
  description: "As melhores ofertas em eletrônicos, roupas e joias.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
        
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            
            <div className="flex items-center gap-4">
              <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Menu size={24} />
              </button>
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                  <ShoppingBag size={20} strokeWidth={3} />
                </div>
                <span className="text-xl font-bold tracking-tight text-gray-900">
                  Altaa<span className="text-blue-600">Store</span>
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
              <a href="#" className="text-blue-600 font-semibold">Início</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Categorias</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Ofertas</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Sobre</a>
            </nav>

            <div className="flex items-center gap-2 sm:gap-4">
              <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                <Search size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                <User size={20} />
              </button>
              <button className="relative p-2 text-gray-500 hover:text-blue-600 transition-colors group">
                <ShoppingBag size={20} />
                <span className="absolute top-1 right-0 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  2
                </span>
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 bg-white flex flex-col">
          {children}
        </div>

        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Sobre a Altaa</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Referência em tecnologia e moda, trazendo os melhores produtos do mercado com entrega rápida e segura para todo o Brasil.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Ajuda</h3>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><a href="#" className="hover:text-blue-600">Meus Pedidos</a></li>
                  <li><a href="#" className="hover:text-blue-600">Devoluções</a></li>
                  <li><a href="#" className="hover:text-blue-600">Fale Conosco</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Institucional</h3>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><a href="#" className="hover:text-blue-600">Trabalhe Conosco</a></li>
                  <li><a href="#" className="hover:text-blue-600">Política de Privacidade</a></li>
                  <li><a href="#" className="hover:text-blue-600">Termos de Uso</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Novidades</h3>
                <p className="text-gray-500 text-sm mb-4">Assine nossa newsletter para receber ofertas.</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Seu e-mail" 
                    className="flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    OK
                  </button>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
              <p>&copy; 2026 Altaa Digital Store. Todos os direitos reservados.</p>
              <p>Desenvolvido como Desafio Técnico.</p>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}