export function TrustSection() {
    const brands = [
        { name: "ASUS ROG", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Republic_Of_Gamers_Logo.svg/1200px-Republic_Of_Gamers_Logo.svg.png" },
        { name: "NVIDIA", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/1024px-Nvidia_logo.svg.png" },
        { name: "AMD", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/AMD_Logo.svg/1200px-AMD_Logo.svg.png" },
        { name: "Corsair", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Corsair_Components_Logo.svg/800px-Corsair_Components_Logo.svg.png" },
        { name: "MSI", logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/MSI_Logo.svg" },
        { name: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Intel_logo_2023.svg/1200px-Intel_logo_2023.svg.png" },
        { name: "Gigabyte", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Gigabyte_Technology_logo_20080107.svg/1280px-Gigabyte_Technology_logo_20080107.svg.png" },
        { name: "NZXT", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/NZXT_logo.svg/1280px-NZXT_logo.svg.png" }
    ];

    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-aether-darker/50 backdrop-blur-sm z-0"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-display font-bold mb-4">Marcas <span className="gradient-text">Asociadas</span></h2>
                    <p className="text-text-secondary">Trabajamos con los líderes de la industria para garantizar el máximo rendimiento</p>
                </div>

                <div className="relative flex overflow-x-hidden group">
                    <div className="animate-marquee whitespace-nowrap flex space-x-12 items-center">
                        {[...brands, ...brands].map((brand, index) => (
                            <div key={`${brand.name}-${index}`} className="inline-block w-32 md:w-40 opacity-40 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0 transform hover:scale-110 cursor-pointer">
                                <img src={brand.logo} alt={brand.name} className="h-12 w-full object-contain filter brightness-0 invert hover:filter-none hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                            </div>
                        ))}
                    </div>
                    {/* Fade Edges */}
                    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-aether-darker to-transparent pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-aether-darker to-transparent pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
}
