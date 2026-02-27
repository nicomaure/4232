import React, { useState, useEffect } from 'react';
import {
    Book, Lightbulb, Palette, Music, Code, ShieldCheck, Zap, Bot, Search, Pencil, Mic,
    MessageSquare, LayoutGrid, GraduationCap, Brain, Compass, Award, Building2,
    Rocket, Server, Globe, Sparkles, FolderOpen, Puzzle, MonitorSpeaker, Factory,
    Share2, Shield, Eye, Lock, UserCheck, Scale, ScrollText, Presentation, ImagePlus, Headphones
} from 'lucide-react';

// Un objeto para mapear nombres de iconos a componentes de Lucide React
const icons = {
    Book, Lightbulb, Palette, Music, Code, ShieldCheck, Zap, Bot, Search, Pencil, Mic,
    MessageSquare, LayoutGrid, GraduationCap, Brain, Compass, Award, Building2,
    Rocket, Server, Globe, Sparkles, FolderOpen, Puzzle, MonitorSpeaker, Factory,
    Share2, Shield, Eye, Lock, UserCheck, Scale, ScrollText, Presentation, ImagePlus, Headphones
};

// Datos de las herramientas de IA
const academicTools = [
    {
        name: "Claude (Anthropic)",
        description: "Un asistente súper inteligente para escribir, resumir y analizar textos largos. Ideal para trabajos prácticos, informes y explicaciones claras.",
        icon: "Bot",
        link: "https://claude.ai/",
        notes: "Dato útil: Tiene uso gratuito diario y escribe de forma muy natural, como si fuera una persona."
    },
    {
        name: "ChatGPT",
        description: "Perfecto para empezar cualquier tarea: ideas, explicaciones, ejemplos y ayuda paso a paso.",
        icon: "MessageSquare",
        link: "https://chat.openai.com/",
        notes: "Dato útil: La versión gratuita es muy potente y alcanza para la mayoría de los trabajos escolares."
    },
    {
        name: "Perplexity AI",
        description: "Un buscador inteligente que responde con información clara y muestra las fuentes.",
        icon: "Search",
        link: "https://www.perplexity.ai/",
        notes: "Dato útil: Ideal para investigar temas y comprobar que la información sea confiable."
    },
    {
        name: "Gamma.app",
        description: "Crea presentaciones, documentos o páginas web en segundos.",
        icon: "Presentation",
        link: "https://gamma.app/",
        notes: "Dato útil: Tiene créditos gratuitos para empezar. Olvidate de hacer diapositivas desde cero."
    },
    {
        name: "Google Gemini",
        description: "La IA de Google, conectada a internet en tiempo real.",
        icon: "Lightbulb",
        link: "https://gemini.google.com/",
        notes: "Dato útil: Funciona muy bien si usás Google Docs, Drive o Gmail."
    },
    {
        name: "QuillBot",
        description: "Reescribe textos, mejora redacciones y cambia el tono.",
        icon: "ScrollText",
        link: "https://quillbot.com/",
        notes: "Dato útil: La versión gratuita sirve para párrafos cortos y correcciones rápidas."
    },
    {
        name: "Notion AI",
        description: "Organizá apuntes, tareas y horarios en un solo lugar.",
        icon: "FolderOpen",
        link: "https://www.notion.so/product/ai",
        notes: "Dato útil: Los estudiantes con correo educativo tienen acceso gratuito."
    },
    {
        name: "Quizlet AI",
        description: "Estudiá con tarjetas, juegos y repasos automáticos.",
        icon: "GraduationCap",
        link: "https://quizlet.com/",
        notes: "Dato útil: Ideal para preparar pruebas, exámenes orales y memorizar conceptos."
    }
];

const creativeTools = [
    {
        name: "Microsoft Designer",
        description: "Generador de imágenes y diseños asombrosos potenciado por DALL-E 3 de OpenAI.",
        icon: "ImagePlus",
        link: "https://designer.microsoft.com/",
        notes: "Gratuito con cuenta de Microsoft; ofrece 'boosts' diarios para generar arte rápido."
    },
    {
        name: "Suno AI",
        description: "Crea canciones completas (con letra, melodía y voces increíbles) a partir de una simple idea textual.",
        icon: "Headphones",
        link: "https://suno.com/",
        notes: "Te da créditos diarios gratis para hacer canciones completas. ¡Pruébalo para un proyecto de clase!"
    },
    {
        name: "Canva (Magic Studio)",
        description: "Diseño gráfico rápido con IA integrada (Magic Write, Text-to-Image y Borrador Mágico).",
        icon: "Palette",
        link: "https://www.canva.com/",
        notes: "Gratis para educación. Cuenta con cientos de plantillas geniales."
    },
    {
        name: "StarryAI",
        description: "Genera arte con IA con distintos estilos (anime, hiperrealista, fantasía).",
        icon: "Sparkles",
        link: "https://starryai.com/",
        notes: "5 obras de arte al día de forma gratuita y sin marcas de agua."
    },
    {
        name: "Google Teachable Machine",
        description: "Entrena modelos de IA (imágenes, sonidos, poses) desde tu cámara, ¡sin tocar código!",
        icon: "Brain",
        link: "https://teachablemachine.withgoogle.com/",
        notes: "100% Gratuito. Excelente para entender cómo 'aprende' realmente una computadora."
    },
    {
        name: "Scratch Lab Face Sensing",
        description: "Crea juegos que interactúan con tu cara usando programación por bloques.",
        icon: "Code",
        link: "https://lab.scratch.mit.edu/face-sensing/",
        notes: "Gratuito. Requiere navegador con acceso a la cámara web."
    },
    {
        name: "IBM SkillsBuild AI",
        description: "Aprende los fundamentos de la IA y consigue certificados armando proyectos prácticos.",
        icon: "Building2",
        link: "https://skillsbuild.org/",
        notes: "Completamente gratuito. Bueno si quieres saber más de la parte técnica y teórica."
    }
];

const noCodeTools = [
    {
        name: "Glide",
        description: "Transforma un archivo de 'Hojas de Cálculo de Google' (Excel) en una App móvil en minutos.",
        icon: "LayoutGrid",
        link: "https://www.glideapps.com/",
        notes: "Plan gratuito inicial. Ideal para diseñar apps rápido para el colegio."
    },
    {
        name: "Thunkable",
        description: "Crea apps móviles reales para iOS y Android con una interfaz visual de arrastrar y soltar.",
        icon: "Share2",
        link: "https://thunkable.com/",
        notes: "Excelente puerta de entrada a la creación de aplicaciones escolares."
    },
    {
        name: "Webflow",
        description: "Diseña páginas web profesionales y altamente personalizadas sin usar programación.",
        icon: "Globe",
        link: "https://webflow.com/",
        notes: "Plan gratuito disponible; ofrece muchísima libertad de diseño."
    }
];


// Componente Tarjeta de Herramienta
const ToolCard = ({ tool }) => {
    const IconComponent = icons[tool.icon] || Lightbulb; // Icono por defecto si no se encuentra
    return (
        <a
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden bg-slate-900/40 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:shadow-cyan-500/20 transition-all duration-500 transform hover:-translate-y-2
        flex flex-col items-start text-left group border border-white/10 hover:border-cyan-400/50"
        >
            {/* Brillo de fondo sutil en hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

            <div className="flex items-center mb-4 relative z-10">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:bg-cyan-500/10 transition-colors duration-300">
                    <IconComponent size={28} className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                </div>
                <h3 className="ml-4 text-xl font-bold text-slate-100 group-hover:text-white transition-colors duration-300">
                    {tool.name}
                </h3>
            </div>
            <p className="text-slate-300 text-sm mb-4 leading-relaxed flex-grow relative z-10">{tool.description}</p>
            {tool.notes && (
                <p className="text-slate-400/80 text-xs mt-auto relative z-10 bg-black/20 p-3 rounded-lg border border-white/5 w-full">
                    <span className="font-semibold text-cyan-500/80">Nota:</span> {tool.notes}
                </p>
            )}
            <span className="mt-5 text-cyan-400 text-sm font-semibold flex items-center group-hover:text-cyan-300 transition-colors duration-300 relative z-10">
                Ir a la página
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </span>
        </a>
    );
};

// Componente Sección de Herramientas (reutilizable)
const ToolSection = ({ id, title, description, tools }) => (
    <section id={id} className="py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6 drop-shadow-sm tracking-tight">
                {title}
            </h2>
            <p className="text-lg md:text-xl text-slate-300 text-center mb-16 max-w-3xl mx-auto leading-relaxed">
                {description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {tools.map((tool, index) => (
                    <ToolCard key={index} tool={tool} />
                ))}
            </div>
        </div>
    </section>
);

// Componente Sección de Uso Ético
const EthicalAISection = ({ id }) => (
    <section id={id} className="py-24 px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400 mb-6 drop-shadow-sm">
                ⚠️ Usá la IA con responsabilidad
            </h2>
            <p className="text-xl text-slate-300 mb-16 max-w-3xl mx-auto">
                La tecnología es un amplificador de tu talento. Estas son algunas reglas de oro para aprovecharla al máximo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-fuchsia-500/20 hover:border-fuchsia-400/40 transition-colors duration-300">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <ShieldCheck size={32} className="mr-4 text-fuchsia-400" />
                        Integridad y Verificación
                    </h3>
                    <ul className="space-y-4 text-slate-300">
                        <li className="flex items-start"><div className="w-2 h-2 mt-2 mr-3 bg-fuchsia-400 rounded-full shrink-0"></div><span><strong className="text-white font-semibold">Revisá siempre la información:</strong> La IA puede equivocarse o inventar datos.</span></li>
                        <li className="flex items-start"><div className="w-2 h-2 mt-2 mr-3 bg-fuchsia-400 rounded-full shrink-0"></div><span><strong className="text-white font-semibold">El trabajo es tuyo:</strong> Usala como ayuda para entender mejor y no simplemente para copiar y pegar.</span></li>
                        <li className="flex items-start"><div className="w-2 h-2 mt-2 mr-3 bg-fuchsia-400 rounded-full shrink-0"></div><span><strong className="text-white font-semibold">Sé transparente:</strong> Decile a tus profesores qué herramientas usaste y para qué te sirvieron.</span></li>
                    </ul>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-indigo-500/20 hover:border-indigo-400/40 transition-colors duration-300">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <Lock size={32} className="mr-4 text-indigo-400" />
                        Privacidad y Seguridad
                    </h3>
                    <ul className="space-y-4 text-slate-300">
                        <li className="flex items-start"><div className="w-2 h-2 mt-2 mr-3 bg-indigo-400 rounded-full shrink-0"></div><span><strong className="text-white font-semibold">Cuidá tus datos:</strong> Nunca compartas contraseñas, tu dirección, ni datos personales de la escuela en el chat de una IA.</span></li>
                        <li className="flex items-start"><div className="w-2 h-2 mt-2 mr-3 bg-indigo-400 rounded-full shrink-0"></div><span><strong className="text-white font-semibold">Cuestioná las respuestas:</strong> Compará lo que te dice la Inteligencia con otras fuentes.</span></li>
                        <li className="flex items-start"><div className="w-2 h-2 mt-2 mr-3 bg-indigo-400 rounded-full shrink-0"></div><span><strong className="text-white font-semibold">Huella Digital:</strong> Lo que hacés en internet también construye tu identidad.</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
);


// Componente Principal de la Aplicación
const App = () => {
    const [activeSection, setActiveSection] = useState('inicio');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavClick = (sectionId) => {
        setActiveSection(sectionId);
        setIsMenuOpen(false); // Cierra el menú al hacer clic en un enlace
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        // Scroll to the active section when it changes, useful for direct links/initial load
        document.getElementById(activeSection)?.scrollIntoView({ behavior: 'smooth' });
    }, [activeSection]);

    return (
        <div className="font-inter antialiased text-slate-200 bg-slate-950 min-h-screen relative overflow-hidden">

            {/* Elementos de fondo decorativos (Luces Blur) */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/20 blur-[120px] pointer-events-none z-0"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[150px] pointer-events-none z-0"></div>

            {/* Header / Navbar Glassmorphism */}
            <header className="fixed top-0 w-full z-50 bg-slate-950/60 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
                <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                            <Sparkles size={20} className="text-white" />
                        </div>
                        <span className="text-white text-xl font-bold tracking-tight">4-232 Teresa Ghilardi</span>
                    </div>

                    {/* Menú para pantallas grandes */}
                    <ul className="hidden md:flex space-x-8">
                        {[
                            { id: 'inicio', label: 'Inicio' },
                            { id: 'academicas', label: 'Estudios' },
                            { id: 'creativas', label: 'Arte & Código' },
                            { id: 'etica', label: 'Uso Ético' },
                            { id: 'nocode', label: 'Crea tu App' }
                        ].map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => handleNavClick(item.id)}
                                    className={`text-sm font-semibold transition-all duration-300 hover:text-cyan-400 px-3 py-2 rounded-lg hover:bg-white/5 ${activeSection === item.id ? 'text-cyan-400 bg-white/5' : 'text-slate-300'}`}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Botón de menú hamburguesa para móviles */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            )}
                        </svg>
                    </button>
                </nav>

                {/* Menú móvil desplegable */}
                {isMenuOpen && (
                    <div className="md:hidden bg-slate-900 border-b border-white/10 px-4 py-4 absolute w-full left-0 shadow-2xl">
                        <ul className="flex flex-col space-y-2">
                            {[
                                { id: 'inicio', label: 'Inicio' },
                                { id: 'academicas', label: 'Estudios' },
                                { id: 'creativas', label: 'Arte & Código' },
                                { id: 'etica', label: 'Uso Ético' },
                                { id: 'nocode', label: 'Crea tu App' }
                            ].map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => handleNavClick(item.id)}
                                        className="text-left w-full px-4 py-3 text-sm font-semibold text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-colors"
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </header>

            {/* Hero Section */}
            <section id="inicio" className="relative flex items-center justify-center min-h-screen pt-20 pb-12 px-6 overflow-hidden z-10">
                <div className="relative z-10 max-w-5xl mx-auto text-center">

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-white/10 backdrop-blur-md mb-8">
                        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs font-semibold text-slate-300 tracking-wider uppercase">Directorio IA Actualizado 2026</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight mb-8">
                        <span className="block text-white">Domina el futuro</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                            desde tu escuela.
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
                        Las mejores herramientas de Inteligencia Artificial seleccionadas para estudiantes. Resuelve tareas, crea arte asombroso y aprende a programar sin barreras.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={() => handleNavClick('academicas')}
                            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 text-base font-bold rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.3)]
            hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            Ver Herramientas <Zap size={20} />
                        </button>
                        <button
                            onClick={() => handleNavClick('etica')}
                            className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 text-white text-base font-bold rounded-2xl border border-white/10 backdrop-blur-md
            hover:bg-slate-800 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            Leer Guía Ética <ShieldCheck size={20} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Separador visual sutil */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            {/* Secciones de Herramientas */}
            <ToolSection
                id="academicas"
                title="Herramientas IA para Estudiantes"
                description="Usá la Inteligencia Artificial para hacer tareas más rápido, entender mejor los temas y crear cosas increíbles."
                tools={academicTools}
            />

            <ToolSection
                id="creativas"
                title="Arte, Diseño & Código"
                description="Genera canciones, diseña imágenes espectaculares y aprende programación básica jugando. Todo gratis."
                tools={creativeTools}
            />

            {/* Sección de Uso Ético */}
            <EthicalAISection id="etica" />

            {/* Sección Crea tu Propia IA (No-Code) */}
            <ToolSection
                id="nocode"
                title="Crea tus Propias Apps"
                description="¿Tienes una idea para la Feria de Ciencias? Arma tu propia aplicación o página web profesional sin escribir una sola línea de código."
                tools={noCodeTools}
            />

            {/* Footer Moderno */}
            <footer className="relative z-10 border-t border-white/10 bg-slate-950 pt-16 pb-8 px-6 mt-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                            <Building2 size={24} className="text-cyan-500" />
                            <span className="text-xl font-bold text-white">Escuela 4-232 Teresa Ghilardi</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="text-center md:text-right">
                            <p className="text-slate-500 text-sm mb-2 font-medium">Desarrollado por</p>
                            <p className="text-slate-300 font-semibold">Nicolás Maure</p>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} - Plataforma de acceso gratuito.</p>
                    <p>La disponibilidad de las herramientas puede variar según los cambios de sus creadores.</p>
                </div>
            </footer>
        </div>
    );
};

export default App;
