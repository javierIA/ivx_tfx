"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Camera, Database, Cpu, Eye, Cog, CheckCircle2, AlertTriangle, Workflow, Boxes } from "lucide-react"
import { AzureIcons } from "@/components/azure-icons"

// Modificar la definición de los casos de uso para incluir el nuevo caso de uso de datasets sintéticos
const useCases = [
  {
    id: "kit-verification",
    name: "Inferencia de Kits con VisionKit",
    description: "Proceso de verificación automática de kits de componentes en líneas de producción.",
    flow: [
      {
        from: "Cámaras",
        to: "Edge Computing Jetson Orin",
        description:
          "Las cámaras Hikvision capturan imágenes de los kits y las envían directamente al dispositivo Jetson Orin.",
        communication: "RTSP",
        delivers: "Streaming de video en tiempo real (1080p)",
      },
      {
        from: "Edge Computing Jetson Orin",
        to: "Raspberry Pi",
        description: "El modelo YOLOv8 ejecuta la detección de componentes y envía los resultados al Raspberry Pi.",
        communication: "MQTT",
        delivers: "JSON con coordenadas de detección y confianza",
      },
      {
        from: "Raspberry Pi",
        to: "PLCs",
        description:
          "Raspberry Pi comunica los resultados de la detección al PLC a través de GPIO dependiendo de los resultados.",
        communication: "GPIO",
        delivers: "Señales de control basadas en la detección",
      },
      {
        from: "PLCs",
        to: "Raspberry Pi",
        description: "La línea PLC comunica con Raspberry Pi para regresar el estado de la línea.",
        communication: "GPIO",
        delivers: "Estado actual de la línea de producción",
      },
      {
        from: "Raspberry Pi",
        to: "Pantallas UI",
        description: "Raspberry Pi comunica a la pantalla UI los componentes a detectar y el estado de la línea.",
        communication: "MQTT",
        delivers: "Información de componentes y estado de la línea",
      },
    ],
    highlightedPaths: ["cameras-jetson", "jetson-rpi", "rpi-plc", "plc-rpi", "rpi-ui", "azure-user"],
    details:
      "VisionKit automatiza la verificación de kits de componentes utilizando visión artificial. El sistema detecta la presencia, posición y orientación correcta de cada componente según las especificaciones del kit. Esto reduce errores humanos y acelera el proceso de verificación.",
  },
  {
    id: "model-training",
    name: "Entrenamiento de Modelo Inicial",
    description: "Proceso de creación y entrenamiento de modelos de detección para nuevos kits.",
    flow: [
      {
        from: "Ingeniero",
        to: "VisionKit API",
        description: "El ingeniero crea un nuevo kit en la interfaz web de VisionKit.",
        communication: "HTTPS",
        delivers: "Configuración del kit (JSON)",
      },
      {
        from: "VisionKit API",
        to: "Azure Blob Storage",
        description: "Se descarga un archivo zip con fotografías desde Azure Blob Storage.",
        communication: "REST API",
        delivers: "Archivo zip con fotografías para entrenamiento",
      },
      {
        from: "VisionKit API",
        to: "IA Center (GPU)",
        description: "Las imágenes etiquetadas se utilizan para entrenar un modelo YOLOv8.",
        communication: "gRPC",
        delivers: "Dataset etiquetado (COCO format)",
      },
      {
        from: "IA Center (GPU)",
        to: "Azure Blob Storage",
        description: "El modelo entrenado se almacena en Azure Blob Storage.",
        communication: "Azure SDK",
        delivers: "Modelo YOLOv8 (.pt, ~15MB)",
      },
      {
        from: "Azure Blob Storage",
        to: "Base de datos",
        description: "Azure se comunica con la base de datos.",
        communication: "SQL",
        delivers: "Consulta de datos para el modelo",
      },
    ],
    highlightedPaths: ["user-azure", "azure-ia", "ia-gpu", "gpu-storage", "storage-edge"],
    details:
      "El proceso de entrenamiento de modelos en VisionKit permite crear detectores personalizados para cada tipo de kit. Los ingenieros pueden definir los componentes, sus posiciones ideales y tolerancias, y luego entrenar un modelo YOLOv8 que se desplegará en las líneas de producción.",
  },
  {
    id: "video-labeling",
    name: "Etiquetar Videos en CVAT",
    description: "Proceso de etiquetado de videos para entrenamiento de modelos.",
    flow: [
      {
        from: "VisionKit API",
        to: "Azure Blob Storage",
        description: "Se crea un proyecto de etiquetado en CVAT con el kit asignado.",
        communication: "REST API",
        delivers: "Configuración del proyecto y tareas",
      },
      {
        from: "Ingeniero",
        to: "IA Center (CVAT)",
        description: "El ingeniero etiqueta manualmente los componentes en los frames del video.",
        communication: "HTTPS",
        delivers: "Anotaciones de objetos (bounding boxes, polígonos)",
      },
      {
        from: "Ingeniero",
        to: "VisionKit API",
        description: "El ingeniero sube el proyecto con el kit asignado a través de la interfaz web.",
        communication: "HTTPS",
        delivers: "Videos en formato MP4/AVI (1-2GB)",
      },
      {
        from: "VisionKit API",
        to: "Azure Blob Storage",
        description: "El proyecto con el kit asignado se almacena temporalmente en el blob storage.",
        communication: "Azure SDK",
        delivers: "Archivos de video sin procesar",
      },
      {
        from: "IA Center (CVAT)",
        to: "Azure Blob Storage",
        description: "Las anotaciones se exportan y almacenan junto con los frames extraídos.",
        communication: "REST API",
        delivers: "Dataset etiquetado (COCO/YOLO format)",
      },
      {
        from: "Azure Blob Storage",
        to: "IA Center (CPU)",
        description: "El dataset etiquetado se utiliza para entrenar o refinar modelos.",
        communication: "HTTPS",
        delivers: "Dataset listo para entrenamiento",
      },
    ],
    highlightedPaths: ["user-azure", "azure-cvat", "cvat-storage", "storage-gpu"],
    details:
      "El etiquetado de videos en CVAT es un paso crucial para crear datasets de entrenamiento de alta calidad. Los ingenieros utilizan la herramienta CVAT para marcar con precisión la ubicación y tipo de cada componente en los frames de video, generando anotaciones que luego se utilizan para entrenar modelos de detección de objetos. Este proceso, aunque manual, garantiza la calidad de los datos de entrenamiento.",
  },
  {
    id: "refine-model",
    name: "Refinar Modelos",
    description: "Proceso de refinamiento de modelos de detección utilizando videos etiquetados manualmente.",
    flow: [
      {
        from: "Ingeniero",
        to: "VisionKit API",
        description: "El ingeniero selecciona el proyecto con el kit asignado etiquetado para refinar el modelo.",
        communication: "HTTPS",
        delivers: "Selección de videos etiquetados (JSON)",
      },
      {
        from: "VisionKit API",
        to: "Azure Blob Storage",
        description: "Se recuperan el proyecto con el kit asignado etiquetado y sus anotaciones.",
        communication: "Azure SDK",
        delivers: "Dataset etiquetado (COCO/YOLO format)",
      },
      {
        from: "Azure Blob Storage",
        to: "IA Center (GPU)",
        description: "El dataset etiquetado se transfiere al servidor de entrenamiento.",
        communication: "HTTPS",
        delivers: "Dataset completo para refinamiento",
      },
      {
        from: "VisionKit API",
        to: "IA Center (GPU)",
        description: "Se inicia el proceso de refinamiento del modelo existente.",
        communication: "REST API",
        delivers: "Parámetros de refinamiento y configuración",
      },
      {
        from: "IA Center (GPU)",
        to: "IA Center (GPU)",
        description: "El modelo se refina utilizando el proyecto con el kit asignado etiquetado manualmente.",
        communication: "Interno",
        delivers: "Modelo refinado con mayor precisión",
      },
      {
        from: "IA Center (GPU)",
        to: "Azure Blob Storage",
        description: "El modelo refinado se almacena en Azure Blob Storage.",
        communication: "Azure SDK",
        delivers: "Modelo YOLOv8 refinado (.pt, ~15MB)",
      },
      {
        from: "Azure Blob Storage",
        to: "Base de datos",
        description: "El modelo refinado se almacena en la base de datos para su posterior uso.",
        communication: "SQL",
        delivers: "Modelo optimizado para almacenamiento",
      },
    ],
    highlightedPaths: ["user-azure", "azure-storage", "storage-gpu", "gpu-storage", "storage-edge"],
    details:
      "El proceso de refinamiento de modelos permite mejorar la precisión de los modelos de detección utilizando datos reales etiquetados manualmente. A diferencia del entrenamiento inicial que utiliza datasets sintéticos, el refinamiento aprovecha los videos capturados en las líneas de producción y etiquetados por ingenieros en CVAT. Esto permite que el modelo se adapte mejor a las condiciones reales de iluminación, posicionamiento y variaciones de los componentes en la línea de producción.",
  },
  {
    id: "device-configuration",
    name: "Enviar Configuración a los Dispositivos",
    description:
      "Proceso de envío de configuración de kits a los dispositivos de Edge Computing en las líneas de producción.",
    flow: [
      {
        from: "Ingeniero",
        to: "VisionKit API",
        description: "El ingeniero selecciona el kit a poner en la línea a través de la interfaz web.",
        communication: "HTTPS",
        delivers: "Selección del kit y línea de destino",
      },
      {
        from: "VisionKit API",
        to: "Base de Datos",
        description: "Se consulta la configuración completa del kit seleccionado.",
        communication: "SQL",
        delivers: "Datos de configuración del kit",
      },
      {
        from: "VisionKit API",
        to: "Edge Computing Jetson Orin",
        description: "Se envía la configuración del kit al dispositivo Jetson Orin de la línea seleccionada.",
        communication: "MQTT",
        delivers: "Configuración JSON con parámetros del modelo",
      },
      {
        from: "VisionKit API",
        to: "Raspberry Pi",
        description: "Se envía la configuración de comunicación y parámetros de control a la Raspberry Pi.",
        communication: "MQTT",
        delivers: "Configuración JSON con parámetros de control",
      },
      {
        from: "Edge Computing Jetson Orin",
        to: "VisionKit API",
        description: "El dispositivo confirma la recepción y aplicación de la configuración.",
        communication: "MQTT",
        delivers: "Confirmación de configuración aplicada",
      },
      {
        from: "Raspberry Pi",
        to: "VisionKit API",
        description: "El dispositivo confirma la recepción y aplicación de la configuración.",
        communication: "MQTT",
        delivers: "Confirmación de configuración aplicada",
      },
    ],
    highlightedPaths: ["user-azure", "azure-db", "azure-edge", "edge-rpi"],
    details:
      "El proceso de envío de configuración a los dispositivos permite actualizar rápidamente los parámetros de detección y control en las líneas de producción. El ingeniero selecciona el kit que se va a producir en una línea específica, y el sistema automáticamente envía todos los parámetros necesarios a los dispositivos Edge Computing (Jetson Orin para procesamiento de imágenes y Raspberry Pi para control). Esto incluye la configuración del modelo de detección, umbrales de confianza, parámetros de comunicación con PLCs y otros ajustes específicos del kit.",
  },
  {
    id: "synthetic-dataset",
    name: "Creación de Datasets Sintéticos",
    description: "Generación de datos sintéticos para entrenamiento de modelos cuando los datos reales son limitados.",
    flow: [
      {
        from: "Ingeniero",
        to: "VisionKit API",
        description: "El ingeniero define parámetros para la generación de imágenes sintéticas de kits.",
        communication: "HTTPS",
        delivers: "Configuración de generación (JSON)",
      },
      {
        from: "VisionKit API",
        to: "IA Center (CPU)",
        description: "Se inicia el proceso de generación de imágenes sintéticas con variaciones aleatorias.",
        communication: "REST API",
        delivers: "Solicitud de generación de dataset",
      },
      {
        from: "IA Center (CPU)",
        to: "IA Center (CPU)",
        description:
          "El motor de renderizado 2D genera imágenes sintéticas con variaciones de posición, iluminación y oclusión.",
        communication: "Interno",
        delivers: "Imágenes sintéticas con anotaciones (10K+)",
      },
      {
        from: "IA Center (CPU)",
        to: "Base de Datos",
        description: "Las imágenes generadas y sus metadatos se almacenan en la base de datos para seguimiento.",
        communication: "SQL",
        delivers: "Metadatos de imágenes y referencias",
      },
      {
        from: "Base de Datos",
        to: "Azure Blob Storage",
        description: "Las imágenes sintéticas y sus anotaciones se transfieren al almacenamiento permanente.",
        communication: "Azure SDK",
        delivers: "Dataset completo (imágenes + COCO JSON)",
      },
      {
        from: "Azure Blob Storage",
        to: "VisionKit API",
        description: "El dataset sintético queda disponible para entrenamiento o validación de modelos.",
        communication: "REST API",
        delivers: "Confirmación de disponibilidad",
      },
    ],
    highlightedPaths: ["user-azure", "azure-ia", "ia-cpu", "cpu-db", "db-storage", "storage-azure"],
    details:
      "La generación de datasets sintéticos permite crear grandes cantidades de datos de entrenamiento cuando los datos reales son escasos o difíciles de obtener. VisionKit utiliza técnicas avanzadas de renderizado 2D y augmentación para generar imágenes realistas con anotaciones perfectas, lo que mejora significativamente el rendimiento de los modelos de detección.",
  },
  {
    id: "quality-control",
    name: "Control de Kits",
    description: "Gestión y administración de kits en el sistema VisionKit.",
    flow: [
      {
        from: "Ingeniero",
        to: "VisionKit API",
        description: "El ingeniero crea un nuevo kit en el sistema.",
        communication: "HTTPS",
        delivers: "Datos del nuevo kit (JSON)",
      },
      {
        from: "VisionKit API",
        to: "Base de Datos",
        description: "Se almacena la información del nuevo kit en la base de datos.",
        communication: "SQL",
        delivers: "Inserción de datos del kit",
      },
      {
        from: "Ingeniero",
        to: "VisionKit API",
        description: "El ingeniero actualiza la configuración de un kit existente.",
        communication: "HTTPS",
        delivers: "Datos actualizados del kit (JSON)",
      },
      {
        from: "VisionKit API",
        to: "Base de Datos",
        description: "Se actualizan los datos del kit en la base de datos.",
        communication: "SQL",
        delivers: "Actualización de datos en DB",
      },
      {
        from: "Ingeniero",
        to: "VisionKit API",
        description: "El ingeniero elimina un kit que ya no se utiliza.",
        communication: "HTTPS",
        delivers: "ID del kit a eliminar",
      },
      {
        from: "VisionKit API",
        to: "Base de Datos",
        description: "Se elimina el kit de la base de datos y sus recursos asociados.",
        communication: "SQL",
        delivers: "Eliminación de registros en DB",
      },
    ],
    highlightedPaths: ["user-azure", "azure-db", "db-azure"],
    details:
      "El Control de Kits permite a los ingenieros gestionar el ciclo de vida completo de los kits en VisionKit. Esto incluye la creación de nuevos kits con sus componentes y configuraciones, la actualización de kits existentes para adaptarlos a cambios en los procesos de producción, y la eliminación de kits obsoletos. El sistema mantiene un registro completo de todos los kits y sus versiones, facilitando la trazabilidad y el mantenimiento.",
  },
  {
    id: "production-monitoring",
    name: "Previsualización en Tabletas",
    description:
      "Visualización en tiempo real del estado de los kits y notificación de componentes faltantes en dispositivos móviles.",
    flow: [
      {
        from: "Líneas de Producción",
        to: "Raspberry Pi",
        description: "La línea envía señal por GPIO al Raspberry Pi para indicar cambios en el estado de la línea.",
        communication: "GPIO",
        delivers: "Señal de cambio de estado de la línea",
      },
      {
        from: "Líneas de Producción",
        to: "Tableta UI",
        description: "La línea envía información a la Tableta UI para refrescar el estado del kit.",
        communication: "MQTT",
        delivers: "Información del estado actual del kit",
      },
      {
        from: "Edge Computing Jetson Orin",
        to: "Tableta UI",
        description: "El Edge Computing GPU envía los resultados de la detección a la tableta.",
        communication: "MQTT",
        delivers: "JSON con información de componentes detectados/faltantes",
      },
      {
        from: "Tableta UI",
        to: "Operador",
        description: "La tableta muestra una previsualización al operador del paso faltante del kit.",
        communication: "UI",
        delivers: "Visualización de componentes faltantes con indicaciones",
      },
      {
        from: "Operador",
        to: "Líneas de Producción",
        description: "El operador corrige el problema basado en la información de la tableta.",
        communication: "Manual",
        delivers: "Corrección de componentes faltantes o mal colocados",
      },
      {
        from: "Tableta UI",
        to: "VisionKit API",
        description: "La tableta envía confirmación de corrección para registro en el sistema.",
        communication: "HTTPS",
        delivers: "Registro de acciones correctivas",
      },
    ],
    highlightedPaths: ["lines-rpi", "lines-tablet", "jetson-tablet", "tablet-user", "user-lines"],
    details:
      "El sistema de previsualización en tabletas permite a los operadores recibir notificaciones inmediatas cuando se detecta un componente faltante o mal colocado en un kit. La tableta muestra exactamente qué componente falta y en qué posición debería estar, facilitando la corrección rápida del problema. Esta comunicación directa entre las líneas de producción, el sistema de detección y el operador reduce significativamente el tiempo de respuesta ante errores y mejora la eficiencia general del proceso de ensamblaje.",
  },
  {
    id: "microservices-architecture",
    name: "Arquitectura de Microservicios VisionKit",
    description: "Visión general de los microservicios que componen el sistema VisionKit.",
    flow: [
      {
        from: "VisionKit API",
        to: "VisionKit UI",
        description: "Proporciona endpoints REST para la interfaz de usuario.",
        communication: "REST API",
        delivers: "Datos JSON para la UI",
      },
      {
        from: "VisionKit UI",
        to: "Usuarios",
        description: "Interfaz web para gestionar kits, componentes y visualizar resultados.",
        communication: "HTTPS/WSS",
        delivers: "Interfaz web React",
      },
      {
        from: "VisionKit API",
        to: "VisionKit Base de Datos",
        description: "Almacena datos estructurados como kits, componentes y usuarios.",
        communication: "SQL/ORM",
        delivers: "Queries y transacciones",
      },
      {
        from: "VisionKit API",
        to: "VisionKit Blob Storage",
        description: "Almacena imágenes, videos y modelos entrenados.",
        communication: "Azure SDK",
        delivers: "Archivos binarios y metadatos",
      },
      {
        from: "VisionKit API",
        to: "VisionKit CVAT",
        description: "Gestiona el etiquetado de imágenes para entrenamiento.",
        communication: "REST API",
        delivers: "Tareas de etiquetado",
      },
      {
        from: "VisionKit API",
        to: "VisionKit GPU",
        description: "Ejecuta tareas de entrenamiento e inferencia que requieren GPU.",
        communication: "gRPC",
        delivers: "Trabajos de entrenamiento",
      },
      {
        from: "VisionKit API",
        to: "VisionKit Edge GPU",
        description: "Gestiona la inferencia en dispositivos Jetson Orin en las líneas.",
        communication: "MQTT",
        delivers: "Configuración y modelos",
      },
      {
        from: "VisionKit Edge GPU",
        to: "VisionKit Edge CPU",
        description: "Comunica resultados de inferencia a través de Raspberry Pi.",
        communication: "MQTT",
        delivers: "Resultados de inferencia",
      },
    ],
    highlightedPaths: ["api-ui", "api-db", "api-storage", "api-cvat", "api-gpu", "api-edge", "edge-rpi"],
    details:
      "VisionKit utiliza una arquitectura de microservicios para proporcionar flexibilidad, escalabilidad y mantenibilidad. Cada microservicio tiene una responsabilidad específica y se comunica con otros a través de APIs bien definidas.",
  },
]

// Definición de los componentes del sistema
const systemComponents = {
  azure: {
    title: "Azure Cloud",
    components: [
      { id: "storage", name: "Azure Storage", icon: "storage" },
      { id: "teleflexback", name: "teleflexback", icon: "appService" },
      { id: "security", name: "Security Group", icon: "securityCenter" },
      { id: "teleflexapp", name: "VisionKit API", icon: "webApp" },
      { id: "frontdoor", name: "Azure Front Door", icon: "frontDoor" },
    ],
  },
  ia: {
    title: "IA CENTER",
    components: [
      {
        id: "cvat",
        name: "teleflexcvat",
        icon: <Eye className="w-8 h-8" />,
        description: "Computer Vision Annotation Tool para etiquetado de imágenes",
      },
      {
        id: "worker1",
        name: "teleflexworker1",
        icon: <Cpu className="w-8 h-8" />,
        description: "Servidor de procesamiento para tareas de IA",
      },
      {
        id: "worker2",
        name: "teleflexworker2",
        icon: <Cpu className="w-8 h-8" />,
        description: "Servidor de procesamiento para tareas de IA",
      },
      {
        id: "storage",
        name: "teleflexstorage",
        icon: <Database className="w-8 h-8" />,
        description: "Almacenamiento local para datos de IA",
      },
    ],
  },
  edge: {
    title: "Edge Computing",
    components: [
      {
        id: "jetson",
        name: "Jetson Orin",
        icon: <Cpu className="w-8 h-8" />,
        description: "Dispositivo Edge GPU para inferencia en tiempo real",
      },
      {
        id: "rpi",
        name: "Raspberry Pi",
        icon: <Cpu className="w-8 h-8" />,
        description: "Dispositivo Edge CPU con comunicación GPIO a PLCs",
      },
    ],
  },
  lines: {
    title: "Líneas de Producción",
    components: [
      { id: "line1", name: "Línea 1", icon: <Workflow className="w-8 h-8" /> },
      { id: "line3", name: "Línea 3", icon: <Workflow className="w-8 h-8" /> },
      { id: "line4", name: "Línea 4", icon: <Workflow className="w-8 h-8" /> },
      { id: "line5", name: "Línea 5", icon: <Workflow className="w-8 h-8" /> },
      { id: "line6", name: "Línea 6", icon: <Workflow className="w-8 h-8" /> },
      { id: "line7", name: "Línea 7", icon: <Workflow className="w-8 h-8" /> },
    ],
  },
  devices: {
    title: "Dispositivos de Campo",
    components: [
      {
        id: "cameras",
        name: "Cámaras",
        icon: <Camera className="w-8 h-8" />,
        description: "Cámaras Hikvision para captura de imágenes",
      },
      {
        id: "plc",
        name: "PLCs",
        icon: <Cog className="w-8 h-8" />,
        description: "Controladores lógicos programables conectados por GPIO",
      },
      {
        id: "tablet",
        name: "Tableta UI",
        icon: <Eye className="w-8 h-8" />,
        description: "Tabletas para visualización de resultados en tiempo real",
      },
    ],
  },
  users: {
    title: "Usuarios",
    components: [
      {
        id: "engineering",
        name: "Ingeniería",
        icon: <Cog className="w-8 h-8" />,
        description: "Creación y gestión de kits y componentes",
      },
      {
        id: "quality",
        name: "Calidad",
        icon: <CheckCircle2 className="w-8 h-8" />,
        description: "Aprobación y validación de kits",
      },
      {
        id: "production",
        name: "Producción",
        icon: <Boxes className="w-8 h-8" />,
        description: "Operación de líneas de producción",
      },
      {
        id: "technical",
        name: "Técnico",
        icon: <AlertTriangle className="w-8 h-8" />,
        description: "Soporte técnico y mantenimiento",
      },
      {
        id: "operator",
        name: "Operador",
        icon: <Boxes className="w-8 h-8" />,
        description: "Operador de línea que corrige problemas en tiempo real",
      },
    ],
  },
}

const getFrequency = (communication: string) => {
  switch (communication) {
    case "RTSP":
      return "30 FPS"
    case "TCP/IP":
      return "Variable, según demanda"
    case "MQTT":
      return "Cada 0.05 segundos"
    case "REST API":
      return "Bajo demanda"
    case "WebSocket":
      return "En tiempo real"
    case "HTTPS":
      return "Bajo demanda"
    case "gRPC":
      return "Variable"
    case "Azure SDK":
      return "Ocasional"
    case "SQL":
      return "Transaccional"
    case "OPC UA":
      return "Cada segundo"
    case "HTTPS/WSS":
      return "En tiempo real"
    case "SQL/ORM":
      return "Transaccional"
    case "GPIO/MQTT":
      return "En tiempo real"
    case "UI":
      return "Inmediato"
    case "Manual":
      return "Variable, según operador"
    case "GPIO":
      return "En tiempo real"
    default:
      return "Desconocido"
  }
}

const getProtocolSummary = (useCase: any) => {
  const protocols: { [key: string]: { name: string; description: string; count: number } } = {}

  useCase.flow.forEach((step: any) => {
    const protocol = step.communication
    if (!protocols[protocol]) {
      protocols[protocol] = {
        name: protocol,
        description: getProtocolDescription(protocol),
        count: 1,
      }
    } else {
      protocols[protocol].count++
    }
  })

  return Object.values(protocols)
}

const getProtocolDescription = (protocol: string) => {
  switch (protocol) {
    case "RTSP":
      return "Protocolo de transmisión de video en tiempo real."
    case "TCP/IP":
      return "Protocolo de comunicación estándar en redes."
    case "MQTT":
      return "Protocolo de mensajería ligero para IoT."
    case "REST API":
      return "Interfaz para acceder a recursos a través de HTTP."
    case "WebSocket":
      return "Protocolo de comunicación bidireccional en tiempo real."
    case "HTTPS":
      return "Protocolo seguro de transferencia de hipertexto."
    case "gRPC":
      return "Framework de RPC de alto rendimiento."
    case "Azure SDK":
      return "Conjunto de herramientas para interactuar con servicios Azure."
    case "SQL":
      return "Lenguaje de consulta para bases de datos relacionales."
    case "OPC UA":
      return "Estándar de comunicación para automatización industrial."
    case "HTTPS/WSS":
      return "Comunicación web segura en tiempo real."
    case "SQL/ORM":
      return "Acceso a bases de datos mediante mapeo objeto-relacional."
    case "ZeroMQ":
      return "Biblioteca de mensajería de alto rendimiento."
    case "GPIO/MQTT":
      return "Comunicación física por pines GPIO combinada con mensajería MQTT."
    case "UI":
      return "Interfaz de usuario para visualización de información."
    case "Manual":
      return "Intervención humana en el proceso."
    case "GPIO":
      return "Comunicación física por pines GPIO."
    default:
      return "Descripción no disponible."
  }
}

const getKeyComponents = (useCase: any) => {
  const components: any[] = []

  useCase.flow.forEach((step: any) => {
    const fromComponent = findComponent(step.from)
    const toComponent = findComponent(step.to)

    if (fromComponent && !components.find((c) => c.name === fromComponent.name)) {
      components.push(fromComponent)
    }

    if (toComponent && !components.find((c) => c.name === toComponent.name)) {
      components.push(toComponent)
    }
  })

  return components
}

const findComponent = (name: string) => {
  for (const category in systemComponents) {
    const component = systemComponents[category as keyof typeof systemComponents].components.find(
      (c) => c.name === name,
    )
    if (component) {
      return component
    }
  }
  return null
}

const getBenefits = (useCase: any) => {
  switch (useCase.id) {
    case "kit-verification":
      return [
        "Reducción de errores humanos en la verificación de kits.",
        "Aceleración del proceso de verificación en líneas de producción.",
        "Detección temprana de componentes faltantes o mal colocados.",
        "Mejora de la calidad del producto final.",
      ]
    case "model-training":
      return [
        "Creación de modelos de detección personalizados para cada tipo de kit.",
        "Optimización del rendimiento de los modelos en las líneas de producción.",
        "Reducción del tiempo y costo de desarrollo de nuevos modelos.",
        "Mayor flexibilidad para adaptarse a nuevos productos y componentes.",
      ]
    case "synthetic-dataset":
      return [
        "Generación de grandes cantidades de datos de entrenamiento de bajo costo.",
        "Mejora del rendimiento de los modelos en condiciones de iluminación y oclusión variables.",
        "Reducción de la necesidad de datos reales etiquetados manualmente.",
        "Mayor robustez de los modelos ante variaciones en los componentes.",
      ]
    case "quality-control":
      return [
        "Gestión centralizada de todos los kits del sistema.",
        "Facilidad para crear, actualizar y eliminar configuraciones de kits.",
        "Trazabilidad completa de cambios en las configuraciones de kits.",
        "Reutilización de componentes entre diferentes kits para mayor eficiencia.",
      ]
    case "production-monitoring":
      return [
        "Notificación inmediata de componentes faltantes directamente al operador.",
        "Visualización clara de los pasos a corregir en el proceso de ensamblaje.",
        "Reducción del tiempo de respuesta ante errores detectados.",
        "Mejora de la eficiencia del operador con instrucciones visuales precisas.",
      ]
    case "device-configuration":
      return [
        "Actualización rápida de parámetros de detección y control en las líneas de producción.",
        "Selección sencilla del kit a producir en una línea específica.",
        "Envío automático de parámetros necesarios a los dispositivos Edge Computing.",
        "Configuración del modelo de detección, umbrales de confianza y parámetros de comunicación con PLCs.",
      ]
    case "refine-model":
      return [
        "Mejora significativa de la precisión del modelo con datos reales.",
        "Adaptación a las condiciones específicas de cada línea de producción.",
        "Reducción de falsos positivos y falsos negativos.",
        "Capacidad de detectar casos extremos y variaciones no contempladas en el dataset sintético.",
      ]
    default:
      return []
  }
}

// Actualizar la función getSyntheticDatasetStats para que sea más específica para el caso de uso

function getSyntheticDatasetStats(): Array<{ name: string; value: string; description: string }> {
  return [
    {
      name: "Volumen de Datos",
      value: "10,000+",
      description: "Imágenes sintéticas generadas por dataset",
    },
    {
      name: "Tiempo de Generación",
      value: "2-4 horas",
      description: "Para un dataset completo con 10K imágenes",
    },
    {
      name: "Precisión de Anotaciones",
      value: "100%",
      description: "Sin errores humanos en el etiquetado",
    },
    {
      name: "Variaciones por Componente",
      value: "50-200",
      description: "Diferentes posiciones, rotaciones e iluminaciones",
    },
    {
      name: "Ahorro de Tiempo",
      value: "95%",
      description: "Comparado con etiquetado manual",
    },
    {
      name: "Mejora de Precisión",
      value: "+15-25%",
      description: "En modelos entrenados con datos limitados",
    },
  ]
}

const formatPathName = (path: string) => {
  const words = path.split("-")
  const formattedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  return formattedWords.join(" → ")
}

// Primero, agregar una función que determine qué componentes son relevantes para cada caso de uso
function getRelevantComponents(useCaseId: string): {
  azure: string[]
  ia: string[]
  edge: string[]
  lines: string[]
  devices: string[]
  users: string[]
} {
  const relevantComponentsMap: Record<
    string,
    {
      azure: string[]
      ia: string[]
      edge: string[]
      lines: string[]
      devices: string[]
      users: string[]
    }
  > = {
    "kit-verification": {
      azure: ["teleflexapp"],
      ia: ["worker1", "worker2"],
      edge: ["jetson", "rpi"],
      lines: ["line1", "line3", "line4", "line5", "line6", "line7"],
      devices: ["cameras", "plc"], // Agregado PLC para mostrar la comunicación GPIO
      users: ["production"],
    },
    "model-training": {
      azure: ["storage", "teleflexapp"],
      ia: ["cvat", "worker1", "worker2"],
      edge: ["jetson"],
      lines: [],
      devices: [],
      users: ["engineering"],
    },
    "synthetic-dataset": {
      azure: ["storage", "teleflexapp"],
      ia: ["worker1", "worker2", "storage"],
      edge: [],
      lines: [],
      devices: [],
      users: ["engineering"],
    },
    "quality-control": {
      azure: ["teleflexapp", "teleflexback"],
      ia: [],
      edge: [],
      lines: [],
      devices: [],
      users: ["engineering"],
    },
    "production-monitoring": {
      azure: ["teleflexapp"],
      ia: [],
      edge: ["jetson", "rpi"],
      lines: ["line1", "line3", "line4", "line5", "line6", "line7"],
      devices: ["tablet", "plc"], // Actualizado para incluir tabletas
      users: ["operator", "production"],
    },
    "microservices-architecture": {
      azure: ["storage", "teleflexback", "security", "teleflexapp", "frontdoor"],
      ia: ["cvat", "worker1", "worker2", "storage"],
      edge: ["jetson", "rpi"],
      lines: [],
      devices: ["cameras", "plc"], // Mostrar todos los dispositivos para la arquitectura completa
      users: ["engineering", "quality", "production", "technical"],
    },
    "video-labeling": {
      azure: ["storage", "teleflexapp"],
      ia: ["cvat", "worker1", "worker2"],
      edge: [],
      lines: [],
      devices: [],
      users: ["engineering"],
    },
    "device-configuration": {
      azure: ["teleflexapp"],
      ia: [],
      edge: ["jetson", "rpi"],
      lines: ["line1", "line3", "line4", "line5", "line6", "line7"],
      devices: ["plc"],
      users: ["engineering"],
    },
    "refine-model": {
      azure: ["storage", "teleflexapp"],
      ia: ["worker1", "worker2"],
      edge: ["jetson"],
      lines: [],
      devices: [],
      users: ["engineering"],
    },
  }

  // Si no hay una configuración específica para el caso de uso, mostrar todos los componentes
  return (
    relevantComponentsMap[useCaseId] || {
      azure: systemComponents.azure.components.map((c) => c.id),
      ia: systemComponents.ia.components.map((c) => c.id),
      edge: systemComponents.edge.components.map((c) => c.id),
      lines: systemComponents.lines.components.map((c) => c.id),
      devices: systemComponents.devices.components.map((c) => c.id),
      users: systemComponents.users.components.map((c) => c.id),
    }
  )
}

export default function ArchitectureViewer() {
  const [selectedUseCase, setSelectedUseCase] = useState("kit-verification")
  const currentUseCase = useCases.find((uc) => uc.id === selectedUseCase) || useCases[0]

  return (
    <div className="grid gap-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="flex items-center gap-3 mb-2 md:mb-0">
          <div className="w-full md:w-80">
            <Select value={selectedUseCase} onValueChange={setSelectedUseCase}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un caso de uso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quality-control">
                  <span className="flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-blue-600 text-white font-bold text-sm">
                      1
                    </span>
                    Control de Kits con VisionKit
                  </span>
                </SelectItem>
                <SelectItem value="synthetic-dataset">
                  <span className="flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-blue-600 text-white font-bold text-sm">
                      2
                    </span>
                    Creación Dataset sintético
                  </span>
                </SelectItem>
                <SelectItem value="model-training">
                  <span className="flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-blue-600 text-white font-bold text-sm">
                      3
                    </span>
                    Entrenamiento de Modelo Inicial
                  </span>
                </SelectItem>
                <SelectItem value="video-labeling">
                  <span className="flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-blue-600 text-white font-bold text-sm">
                      4
                    </span>
                    Etiquetar Videos en CVAT
                  </span>
                </SelectItem>
                <SelectItem value="refine-model">
                  <span className="flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-blue-600 text-white font-bold text-sm">
                      5
                    </span>
                    Refinar Modelos
                  </span>
                </SelectItem>
                <SelectItem value="device-configuration">
                  <span className="flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-blue-600 text-white font-bold text-sm">
                      6
                    </span>
                    Enviar Configuración a los Dispositivos
                  </span>
                </SelectItem>
                <SelectItem value="kit-verification">
                  <span className="flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-blue-600 text-white font-bold text-sm">
                      7
                    </span>
                    Inferencias de Kits con VisionKit
                  </span>
                </SelectItem>
                <SelectItem value="production-monitoring">
                  <span className="flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-blue-600 text-white font-bold text-sm">
                      8
                    </span>
                    Previsualización en Tabletas
                  </span>
                </SelectItem>
                <SelectItem value="microservices-architecture">
                  <span className="flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-blue-600 text-white font-bold text-sm">
                      9
                    </span>
                    Arquitectura de Microservicios VisionKit
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className="text-muted-foreground">{currentUseCase.description}</p>
      </div>

      <Tabs defaultValue="flow" className="w-full">
        <TabsList className="grid grid-cols-4 md:w-fit">
          <TabsTrigger value="flow">Flujo de Datos</TabsTrigger>
          <TabsTrigger value="diagram">Diagrama</TabsTrigger>
          <TabsTrigger value="communication">Comunicación</TabsTrigger>
          <TabsTrigger value="details">Detalles</TabsTrigger>
        </TabsList>

        <TabsContent value="flow" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Flujo de Datos: {currentUseCase.name}</CardTitle>
                <CardDescription>Secuencia paso a paso del flujo de información</CardDescription>
              </div>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.835a2f88e5f5-tVOXVPG0Gv82ycb5xCTO3UVG5bFX86.png"
                alt="Centro de Inteligencia Artificial"
                className="h-8"
              />
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {currentUseCase.flow.map((step, index) => (
                  <li
                    key={index}
                    className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
                  >
                    <div className="font-medium flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold">
                        {index + 1}
                      </span>
                      <span>{step.from}</span>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-500">
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{step.to}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2 ml-8">{step.description}</div>
                    <div className="mt-3 ml-8 grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                          Comunicación
                        </Badge>
                        <span className="text-sm font-medium text-blue-700">{step.communication}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                          Entrega
                        </Badge>
                        <span className="text-sm font-medium text-purple-700">{step.delivers}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diagram" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Diagrama de Arquitectura: {currentUseCase.name}</CardTitle>
                <CardDescription>
                  Las conexiones resaltadas muestran el flujo de datos para este caso de uso
                </CardDescription>
              </div>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.835a2f88e5f5-tVOXVPG0Gv82ycb5xCTO3UVG5bFX86.png"
                alt="Centro de Inteligencia Artificial"
                className="h-8"
              />
            </CardHeader>
            <CardContent>
              <div className="relative border rounded-lg p-4 overflow-auto">
                <div className="min-w-[1000px]">
                  <DiagramWithHighlights useCase={currentUseCase} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Matriz de Comunicación: {currentUseCase.name}</CardTitle>
                <CardDescription>
                  Resumen de los protocolos de comunicación y datos transferidos entre componentes
                </CardDescription>
              </div>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.835a2f88e5f5-tVOXVPG0Gv82ycb5xCTO3UVG5bFX86.png"
                alt="Centro de Inteligencia Artificial"
                className="h-8"
              />
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-100 to-indigo-100">
                      <th className="border p-2 text-left">Origen</th>
                      <th className="border p-2 text-left">Destino</th>
                      <th className="border p-2 text-left">Protocolo</th>
                      <th className="border p-2 text-left">Datos Transferidos</th>
                      <th className="border p-2 text-left">Frecuencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUseCase.flow.map((step, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                        <td className="border p-2 font-medium">{step.from}</td>
                        <td className="border p-2 font-medium">{step.to}</td>
                        <td className="border p-2">
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-normal">
                            {step.communication}
                          </Badge>
                        </td>
                        <td className="border p-2">{step.delivers}</td>
                        <td className="border p-2">{getFrequency(step.communication)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <span className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-sm"></span>
                  Resumen de Protocolos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {getProtocolSummary(currentUseCase).map((protocol, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-gradient-to-br from-slate-50 to-blue-50 border border-blue-100 flex flex-col"
                    >
                      <div className="text-lg font-bold text-blue-700 mb-1">{protocol.name}</div>
                      <div className="text-sm text-blue-800 mb-2">{protocol.description}</div>
                      <div className="text-xs text-blue-600 mt-auto">Usado en {protocol.count} conexiones</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Detalles: {currentUseCase.name}</CardTitle>
                <CardDescription>Información detallada sobre este caso de uso</CardDescription>
              </div>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.835a2f88e5f5-tVOXVPG0Gv82ycb5xCTO3UVG5bFX86.png"
                alt="Centro de Inteligencia Artificial"
                className="h-8"
              />
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 mb-6">
                  <p className="text-blue-800">{currentUseCase.details}</p>
                </div>

                <h3 className="text-lg font-medium mt-6 mb-3 flex items-center gap-2">
                  <span className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-sm"></span>
                  Componentes Clave
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getKeyComponents(currentUseCase).map((component, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 border rounded-md bg-gradient-to-br from-white to-slate-50 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="mt-1 text-primary">
                        {typeof component.icon === "string" ? (
                          <div className="w-12 h-12">
                            <AzureIcons iconName={component.icon} />
                          </div>
                        ) : (
                          <div className="w-12 h-12 flex items-center justify-center">
                            {component.icon || <div className="w-8 h-8 rounded-full bg-primary"></div>}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{component.name}</div>
                        <div className="text-sm text-muted-foreground">{component.description}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {currentUseCase.id === "microservices-architecture" && (
                  <>
                    <h3 className="text-lg font-medium mt-6 mb-3 flex items-center gap-2">
                      <span className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-sm"></span>
                      Repositorios de Código
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 p-3 border rounded-md bg-gradient-to-r from-slate-50 to-gray-50 hover:from-blue-50 hover:to-indigo-50 transition-colors">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                          Backend
                        </Badge>
                        <a
                          href="https://github.com/AIC-Teleflex/TeleflexUI-Backend"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          github.com/AIC-Teleflex/TeleflexUI-Backend
                        </a>
                      </div>
                      <div className="flex items-center gap-2 p-3 border rounded-md bg-gradient-to-r from-slate-50 to-gray-50 hover:from-blue-50 hover:to-indigo-50 transition-colors">
                        <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                          Frontend
                        </Badge>
                        <a
                          href="https://github.com/AIC-Teleflex/TeleflexUI-Frontend"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          github.com/AIC-Teleflex/TeleflexUI-Frontend
                        </a>
                      </div>
                      <div className="flex items-center gap-2 p-3 border rounded-md bg-gradient-to-r from-slate-50 to-gray-50 hover:from-blue-50 hover:to-indigo-50 transition-colors">
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          Raspberry
                        </Badge>
                        <a
                          href="https://github.com/AIC-Teleflex/pytorchRTSPstreams"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          github.com/AIC-Teleflex/pytorchRTSPstreams
                        </a>
                      </div>
                      <div className="flex items-center gap-2 p-3 border rounded-md bg-gradient-to-r from-slate-50 to-gray-50 hover:from-blue-50 hover:to-indigo-50 transition-colors">
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                          Standalone
                        </Badge>
                        <a
                          href="https://github.com/AIC-Teleflex/raspberry_desk"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          github.com/AIC-Teleflex/raspberry_desk
                        </a>
                      </div>
                    </div>
                  </>
                )}

                {currentUseCase.id === "kit-verification" && (
                  <>
                    <h3 className="text-lg font-medium mt-6 mb-3 flex items-center gap-2">
                      <span className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-sm"></span>
                      Métricas de Éxito
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 flex flex-col items-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">98%+</div>
                        <div className="text-sm text-center text-green-800">Precisión de detección correcta</div>
                      </div>
                      <div className="p-4 rounded-lg bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 flex flex-col items-center">
                        <div className="text-3xl font-bold text-amber-600 mb-2">&lt;1.1%</div>
                        <div className="text-sm text-center text-amber-800">Falsos positivos</div>
                      </div>
                      <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 flex flex-col items-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">&lt;0.9%</div>
                        <div className="text-sm text-center text-blue-800">Falsos negativos</div>
                      </div>
                      <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100 flex flex-col items-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">±2°</div>
                        <div className="text-sm text-center text-purple-800">Precisión en medición de ángulos</div>
                      </div>
                      <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 flex flex-col items-center">
                        <div className="text-3xl font-bold text-indigo-600 mb-2">≤5s</div>
                        <div className="text-sm text-center text-indigo-800">Tiempo de procesamiento por paso</div>
                      </div>
                      <div className="p-4 rounded-lg bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 flex flex-col items-center">
                        <div className="text-3xl font-bold text-rose-600 mb-2">&lt;20s</div>
                        <div className="text-sm text-center text-rose-800">Tiempo total de validación del kit</div>
                      </div>
                    </div>
                  </>
                )}

                {currentUseCase.id !== "microservices-architecture" && (
                  <>
                    <h3 className="text-lg font-medium mt-6 mb-3 flex items-center gap-2">
                      <span className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-sm"></span>
                      Beneficios
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {getBenefits(currentUseCase).map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 border rounded-md bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100"
                        >
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white mt-0.5">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <span className="text-blue-900">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {currentUseCase.id === "synthetic-dataset" && (
                  <>
                    <h3 className="text-lg font-medium mt-6 mb-3 flex items-center gap-2">
                      <span className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-sm"></span>
                      Estadísticas del Dataset Sintético
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {getSyntheticDatasetStats().map((stat, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 flex flex-col"
                        >
                          <div className="text-2xl font-bold text-purple-700 mb-1">{stat.value}</div>
                          <div className="text-sm font-medium text-purple-800 mb-1">{stat.name}</div>
                          <div className="text-xs text-purple-600 mt-auto">{stat.description}</div>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-lg font-medium mt-6 mb-3 flex items-center gap-2">
                      <span className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-sm"></span>
                      Tipos de Variaciones Generadas
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100">
                        <div className="font-medium text-purple-800 mb-1">Posición y Orientación</div>
                        <div className="text-sm text-purple-700">
                          Variaciones en la posición (X,Y,Z), rotación y escala de los componentes.
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100">
                        <div className="font-medium text-purple-800 mb-1">Iluminación</div>
                        <div className="text-sm text-purple-700">
                          Cambios en intensidad, dirección, color y sombras de las fuentes de luz.
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100">
                        <div className="font-medium text-purple-800 mb-1">Oclusión</div>
                        <div className="text-sm text-purple-700">
                          Componentes parcialmente ocultos por otros elementos o sombras.
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100">
                        <div className="font-medium text-purple-800 mb-1">Texturas y Materiales</div>
                        <div className="text-sm text-purple-700">
                          Variaciones en las propiedades de superficie de los componentes.
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100">
                        <div className="font-medium text-purple-800 mb-1">Defectos Simulados</div>
                        <div className="text-sm text-purple-700">
                          Simulación de componentes dañados, deformados o con defectos de fabricación.
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100">
                        <div className="font-medium text-purple-800 mb-1">Parámetros de Cámara</div>
                        <div className="text-sm text-purple-700">
                          Variaciones en distancia focal, profundidad de campo, ruido y distorsión.
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Componente para mostrar el diagrama con rutas resaltadas
function DiagramWithHighlights({ useCase }: { useCase: any }) {
  // Obtener los componentes relevantes para este caso de uso
  const relevantComponents = getRelevantComponents(useCase.id)

  // Verificar si tanto el Raspberry Pi como el PLC están presentes para mostrar la conexión GPIO
  const showGpioConnection = relevantComponents.edge.includes("rpi") && relevantComponents.devices.includes("plc")

  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-8">
        {/* Logo en la esquina superior derecha del diagrama */}
        <div className="absolute top-2 right-2">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.835a2f88e5f5-tVOXVPG0Gv82ycb5xCTO3UVG5bFX86.png"
            alt="Centro de Inteligencia Artificial"
            className="h-10"
          />
        </div>

        {/* Highlighted Connections */}
        <div className="p-6 border rounded-lg bg-gradient-to-r from-slate-50 to-gray-50 shadow-sm">
          <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-600">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Conexiones Resaltadas para {useCase.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {useCase.highlightedPaths.map((path: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-white rounded-md border border-blue-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                <span className="font-medium text-blue-800">{formatPathName(path)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

