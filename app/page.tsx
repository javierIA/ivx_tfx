import ArchitectureViewer from "@/components/architecture-viewer"
import { BentoBox, BentoGrid } from "@/components/bento-layout"
import { Card } from "@/components/ui/card"
import { Cpu, Eye, ChevronDown } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"

export default function Home() {
  return (
    <AuthGuard>
      <main className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.835a2f88e5f5-tVOXVPG0Gv82ycb5xCTO3UVG5bFX86.png"
                alt="Centro de Inteligencia Artificial"
                className="h-16"
              />
              <h1 className="text-3xl md:text-4xl font-bold text-blue-800 tracking-tight">
                Visualizador de Arquitectura Industrial
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Explore los diferentes flujos de datos y casos de uso del sistema VisionKit integrado con la
              infraestructura industrial.
            </p>

            {/* Instrucción para el usuario */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <ChevronDown className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-blue-800">
                <span className="font-semibold">Instrucción:</span> Seleccione un caso de uso en el menú desplegable a
                continuación para visualizar su flujo de datos y componentes involucrados.
              </p>
            </div>
          </div>

          {/* Contenedor principal con sombra y bordes redondeados */}
          <Card className="p-6 rounded-xl shadow-md border border-blue-100 bg-white">
            <ArchitectureViewer />
          </Card>
          <BentoGrid className="mb-12">
            {/* Ubicación de Microservicios - Ahora es el primer elemento */}
            <BentoBox size="xl" accent="purple">
              <div className="h-full flex flex-col">
                <h2 className="text-xl font-semibold mb-2 text-purple-800">Ubicación de Microservicios</h2>
                <p className="text-muted-foreground mb-4">Distribución de los microservicios en la infraestructura.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-2">
                  <div className="bg-white rounded-lg p-3 border border-purple-100 hover:shadow-md transition-shadow">
                    <div className="font-medium text-purple-800">Microservicio de API</div>
                    <div className="text-sm text-muted-foreground">
                      Corre en <span className="font-medium">teleflexback</span> (Azure App Service)
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-purple-100 hover:shadow-md transition-shadow">
                    <div className="font-medium text-purple-800">Microservicio de UI</div>
                    <div className="text-sm text-muted-foreground">
                      Corre en <span className="font-medium">teleflexapp</span> (Azure Web App)
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-purple-100 hover:shadow-md transition-shadow">
                    <div className="font-medium text-purple-800">Microservicio de Base de Datos</div>
                    <div className="text-sm text-muted-foreground">
                      Corre en <span className="font-medium">PostgreSQL</span> (Azure Database)
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-purple-100 hover:shadow-md transition-shadow">
                    <div className="font-medium text-purple-800">Microservicio de Blob Storage</div>
                    <div className="text-sm text-muted-foreground">
                      Utiliza <span className="font-medium">Azure Blob Storage</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-purple-100 hover:shadow-md transition-shadow">
                    <div className="font-medium text-purple-800">Microservicio de CVAT</div>
                    <div className="text-sm text-muted-foreground">
                      Corre en <span className="font-medium">teleflexcvat</span> (IA Center)
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-purple-100 hover:shadow-md transition-shadow">
                    <div className="font-medium text-purple-800">Microservicio de GPU</div>
                    <div className="text-sm text-muted-foreground">
                      Corre en <span className="font-medium">teleflexworker1/2</span> (IA Center)
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-purple-100 hover:shadow-md transition-shadow">
                    <div className="font-medium text-purple-800">Microservicio Edge GPU</div>
                    <div className="text-sm text-muted-foreground">
                      Corre en <span className="font-medium">Jetson Orin</span> (Edge Computing)
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-purple-100 hover:shadow-md transition-shadow">
                    <div className="font-medium text-purple-800">Microservicio Edge CPU</div>
                    <div className="text-sm text-muted-foreground">
                      Corre en <span className="font-medium">Raspberry Pi</span> (Edge Computing)
                    </div>
                  </div>
                </div>
              </div>
            </BentoBox>

            <BentoBox size="md" accent="purple">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-purple-800">Documentación</h3>
                  <p className="text-sm text-muted-foreground">Documentación VisionKit API y Guías</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <a
                  href="https://qqlahq2ljm2zwzm5.public.blob.vercel-storage.com/Descripci%C3%B3nAPI-MicroServicio-uqbzA7pbNrPjDEAstxiYbjlxwGVouI.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Descripción API Microservicio
                </a>
                <a
                  href="https://qqlahq2ljm2zwzm5.public.blob.vercel-storage.com/piles/01%20Gu%C3%ADa%20captura%20de%20fotografias%20y%20video%20para%20entrenamiento%20v1%20%281%29-sHjwMks6SMxfoVXfb53TUMrbOPSxLB.docx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Guía captura de fotografías y video
                </a>
                <a
                  href="https://qqlahq2ljm2zwzm5.public.blob.vercel-storage.com/piles/02%20Gu%C3%ADa%20para%20entrenamiento%20y%20refinamiento%20v1%20%281%29-e7GzUNv4zPmKhDC5EjcPomFKXzc5Bt.docx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Guía para entrenamiento y refinamiento
                </a>
                <a
                  href="https://qqlahq2ljm2zwzm5.public.blob.vercel-storage.com/piles/03%20Guia%20definitiva%20para%20el%20entrenamiento%20y%20puesta%20en%20funcionamiento%20de%20kits%20medicos%20%281%29-OX8GagvAH1bFukQbjJH4W13CXzFSC0.docx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Guía definitiva para kits médicos
                </a>
              </div>
            </BentoBox>

            <BentoBox size="sm" accent="green">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-emerald-800">Dispositivos Edge</h3>
                  <p className="text-sm text-muted-foreground">8 dispositivos conectados</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <a
                  href="https://qqlahq2ljm2zwzm5.public.blob.vercel-storage.com/piles/01%20Conexi%C3%B3n%20Caja%20de%20control-ItQlRLwkPCkJWHPXrmMHUocVDnoiMi.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-colors w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Conexión Caja de control
                </a>
                <a
                  href="https://qqlahq2ljm2zwzm5.public.blob.vercel-storage.com/piles/02Conexion%20del%20sistema%20%281%29-lG7wOeFCEkP6ZgmUuskAILMDSpW7jY.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-colors w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Conexión del Sistema
                </a>
                <a
                  href="https://qqlahq2ljm2zwzm5.public.blob.vercel-storage.com/piles/03%20Diagrama%20Unifilar%20Sistema-aKtRyjMhY0RmQjEeG8BzJbHS35oaDC.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-colors w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Diagrama Unifilar Sistema
                </a>
              </div>
            </BentoBox>

            <BentoBox size="md" accent="amber">
              <div className="h-full flex flex-col">
                <h2 className="text-lg font-semibold mb-2 text-amber-800">Comunicación</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">REST/HTTP(S)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">MQTT/IoT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm">Streaming (RTSP/WebSocket)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-sm">Protocolos Industriales</span>
                  </div>
                </div>
              </div>
            </BentoBox>
          </BentoGrid>
        </div>
      </main>
    </AuthGuard>
  )
}

