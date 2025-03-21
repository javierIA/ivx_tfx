import type React from "react"

interface AzureIconsProps {
  iconName: string
  className?: string
}

export const AzureIcons: React.FC<AzureIconsProps> = ({ iconName, className = "w-full h-full" }) => {
  // Asegurar que todos los iconos se rendericen con el mismo viewBox
  const standardClassName = `${className} block`
  const icons: Record<string, React.ReactNode> = {
    azure: (
      <svg className={standardClassName} viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
        <path d="M48 0a48 48 0 1 0 0 96 48 48 0 0 0 0-96z" fill="#fff" />
        <path d="M41.472 34.677H25.2l16.272 27.9L58.8 34.676H41.472z" fill="#0078d4" />
        <path d="M25.2 34.676l30.6 27.9H76.8L25.2 34.676z" fill="#5ea0ef" />
        <path d="M71.7 62.576L58.8 34.676 25.2 62.576h46.5z" fill="#83b9f9" />
        <path d="M58.8 34.676L41.472 62.576h30.228L58.8 34.676z" fill="#5ea0ef" />
      </svg>
    ),
    storage: (
      <svg className={standardClassName} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="storage_a" x1="9" y1="15.83" x2="9" y2="5.79" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#b3b3b3" />
            <stop offset=".26" stopColor="#c1c1c1" />
            <stop offset="1" stopColor="#e6e6e6" />
          </linearGradient>
        </defs>
        <path d="M.5 5.79h17v9.48a.57.57 0 01-.57.57H1.07a.57.57 0 01-.57-.57V5.79z" fill="url(#storage_a)" />
        <path d="M.5 3.48h17v2.31H.5z" fill="#37c2b1" />
        <path d="M.5 2.17h17v1.31H.5z" fill="#258277" />
        <path d="M17.5 2.17v13.66H.5V2.17h17m.5-.5H0v14.66h18V1.67z" fill="#fff" />
        <path
          d="M11 10.35a.35.35 0 00-.35-.35h-3.3a.35.35 0 00-.35.35v3.3a.35.35 0 00.35.35h3.3a.35.35 0 00.35-.35z"
          fill="#37c2b1"
        />
      </svg>
    ),
    appService: (
      <svg className={standardClassName} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="appService_a" x1="9" y1="15.83" x2="9" y2="5.79" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#5ea0ef" />
            <stop offset="1" stopColor="#0078d4" />
          </linearGradient>
        </defs>
        <path d="M.5 5.79h17v9.48a.57.57 0 01-.57.57H1.07a.57.57 0 01-.57-.57V5.79z" fill="url(#appService_a)" />
        <path d="M.5 3.48h17v2.31H.5z" fill="#0078d4" />
        <path d="M.5 2.17h17v1.31H.5z" fill="#5ea0ef" />
        <path d="M17.5 2.17v13.66H.5V2.17h17m.5-.5H0v14.66h18V1.67z" fill="#fff" />
        <path
          d="M11 10.35a.35.35 0 00-.35-.35h-3.3a.35.35 0 00-.35.35v3.3a.35.35 0 00.35.35h3.3a.35.35 0 00.35-.35z"
          fill="#50e6ff"
        />
      </svg>
    ),
    securityCenter: (
      <svg className={standardClassName} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="securityCenter_a" x1="9" y1="1.29" x2="9" y2="16.71" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#5ea0ef" />
            <stop offset="1" stopColor="#0078d4" />
          </linearGradient>
        </defs>
        <path
          d="M9 1.29l7.71 3.21v3.43a7.29 7.29 0 01-7.71 7.78 7.29 7.29 0 01-7.71-7.78V4.5z"
          fill="url(#securityCenter_a)"
        />
        <path
          d="M9 2.06l6.93 2.88v2.99a6.51 6.51 0 01-6.93 6.99 6.51 6.51 0 01-6.93-6.99V4.94L9 2.06z"
          fill="#83b9f9"
        />
        <path d="M9 13.71a4.29 4.29 0 01-4.29-4.28V6.14L9 4.29l4.29 1.85v3.29A4.29 4.29 0 019 13.71z" fill="#0078d4" />
        <path d="M9 12.93a3.5 3.5 0 01-3.5-3.5V6.71L9 5.07l3.5 1.64v2.72a3.5 3.5 0 01-3.5 3.5z" fill="#5ea0ef" />
        <path d="M8.25 8.25h1.5v3h-1.5z" fill="#fff" />
        <path d="M8.25 6.75h1.5v1.5h-1.5z" fill="#fff" />
      </svg>
    ),
    webApp: (
      <svg className={standardClassName} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="webApp_a" x1="9" y1="16.97" x2="9" y2="1.03" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0078d4" />
            <stop offset=".16" stopColor="#1380da" />
            <stop offset=".53" stopColor="#3c91e5" />
            <stop offset=".82" stopColor="#559cec" />
            <stop offset="1" stopColor="#5ea0ef" />
          </linearGradient>
        </defs>
        <path d="M17 1H1a1 1 0 00-1 1v14a1 1 0 001 1h16a1 1 0 001-1V2a1 1 0 00-1-1z" fill="url(#webApp_a)" />
        <path d="M1 1h16a1 1 0 011 1v3H0V2a1 1 0 011-1z" fill="#0078d4" />
        <path
          d="M2 3.5a.5.5 0 11-.5-.5.5.5 0 01.5.5zM4 3.5a.5.5 0 11-.5-.5.5.5 0 01.5.5zM6 3.5a.5.5 0 11-.5-.5.5.5 0 01.5.5z"
          fill="#fff"
        />
        <path d="M13.5 12.5h-9a.5.5 0 010-1h9a.5.5 0 010 1zM13.5 14.5h-9a.5.5 0 010-1h9a.5.5 0 010 1z" fill="#fff" />
        <path d="M10.5 8.5h3v2h-3z" fill="#50e6ff" />
        <path d="M4.5 8.5h5v2h-5z" fill="#c3f1ff" />
      </svg>
    ),
    frontDoor: (
      <svg className={standardClassName} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="frontDoor_a" x1="9" y1="15.799" x2="9" y2="2.201" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0078d4" />
            <stop offset=".156" stopColor="#1380da" />
            <stop offset=".528" stopColor="#3c91e5" />
            <stop offset=".822" stopColor="#559cec" />
            <stop offset="1" stopColor="#5ea0ef" />
          </linearGradient>
        </defs>
        <path
          d="M16.5 2.201h-15a.5.5 0 00-.5.5v12.598a.5.5 0 00.5.5h15a.5.5 0 00.5-.5V2.701a.5.5 0 00-.5-.5z"
          fill="url(#frontDoor_a)"
        />
        <path d="M16.5 2.201h-15a.5.5 0 00-.5.5v1.5h16v-1.5a.5.5 0 00-.5-.5z" fill="#0078d4" />
        <path
          d="M2 3.201a.25.25 0 11-.25-.25.25.25 0 01.25.25zM3 3.201a.25.25 0 11-.25-.25.25.25 0 01.25.25zM4 3.201a.25.25 0 11-.25-.25.25.25 0 01.25.25z"
          fill="#fff"
        />
        <path
          d="M9 6.201a3 3 0 103 3 3.003 3.003 0 00-3-3zm0 4.5a1.5 1.5 0 111.5-1.5 1.502 1.502 0 01-1.5 1.5z"
          fill="#50e6ff"
        />
        <path
          d="M9 7.701a1.5 1.5 0 101.5 1.5 1.502 1.502 0 00-1.5-1.5zm0 2a.5.5 0 11.5-.5.5.5 0 01-.5.5z"
          fill="#fff"
        />
        <path d="M9 8.701a.5.5 0 10.5.5.5.5 0 00-.5-.5z" fill="#9cebff" />
        <path
          d="M4.5 9.201a.5.5 0 01-.5-.5v-1a.5.5 0 011 0v1a.5.5 0 01-.5.5zM13.5 9.201a.5.5 0 01-.5-.5v-1a.5.5 0 011 0v1a.5.5 0 01-.5.5z"
          fill="#c3f1ff"
        />
        <path d="M9 13.201a.5.5 0 01-.5-.5v-1a.5.5 0 011 0v1a.5.5 0 01-.5.5z" fill="#c3f1ff" />
        <path d="M9 6.201a.5.5 0 01-.5-.5v-1a.5.5 0 011 0v1a.5.5 0 01-.5.5z" fill="#c3f1ff" />
      </svg>
    ),
    apiManagement: (
      <svg className={standardClassName} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="apiManagement_a" x1="9" y1="1.155" x2="9" y2="16.845" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#5ea0ef" />
            <stop offset="1" stopColor="#0078d4" />
          </linearGradient>
        </defs>
        <path d="M17.5 9A8.5 8.5 0 119 .5 8.5 8.5 0 0117.5 9z" fill="url(#apiManagement_a)" />
        <path d="M16.369 9A7.369 7.369 0 119 1.631 7.369 7.369 0 0116.369 9z" fill="#83b9f9" />
        <path d="M9 4.167A4.833 4.833 0 114.167 9 4.833 4.833 0 019 4.167z" fill="#0078d4" />
        <path d="M9 5.083A3.917 3.917 0 115.083 9 3.917 3.917 0 019 5.083z" fill="#5ea0ef" />
        <path d="M9 6.75A2.25 2.25 0 116.75 9 2.25 2.25 0 019 6.75z" fill="#83b9f9" />
        <path d="M9 7.667A1.333 1.333 0 117.667 9 1.333 1.333 0 019 7.667z" fill="#fff" />
      </svg>
    ),
    sqlDatabase: (
      <svg className={standardClassName} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sqlDatabase_a" x1="9" y1="15.83" x2="9" y2="5.79" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0078d4" />
            <stop offset=".16" stopColor="#1380da" />
            <stop offset=".53" stopColor="#3c91e5" />
            <stop offset=".82" stopColor="#559cec" />
            <stop offset="1" stopColor="#5ea0ef" />
          </linearGradient>
        </defs>
        <path d="M.5 5.79h17v9.48a.57.57 0 01-.57.57H1.07a.57.57 0 01-.57-.57V5.79z" fill="url(#sqlDatabase_a)" />
        <path d="M.5 3.48h17v2.31H.5z" fill="#0078d4" />
        <path d="M.5 2.17h17v1.31H.5z" fill="#5ea0ef" />
        <path d="M17.5 2.17v13.66H.5V2.17h17m.5-.5H0v14.66h18V1.67z" fill="#fff" />
        <path d="M9 12.5a3.5 3.5 0 113.5-3.5 3.5 3.5 0 01-3.5 3.5z" fill="#83b9f9" />
        <path
          d="M9 6.5a2.5 2.5 0 102.5 2.5A2.5 2.5 0 009 6.5zm0 4a1.5 1.5 0 111.5-1.5 1.5 1.5 0 01-1.5 1.5z"
          fill="#fff"
        />
      </svg>
    ),
    machineLearningSvcs: (
      <svg className={standardClassName} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient
            id="machineLearningSvcs_a"
            x1="9"
            y1="15.799"
            x2="9"
            y2="2.201"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#0078d4" />
            <stop offset=".156" stopColor="#1380da" />
            <stop offset=".528" stopColor="#3c91e5" />
            <stop offset=".822" stopColor="#559cec" />
            <stop offset="1" stopColor="#5ea0ef" />
          </linearGradient>
        </defs>
        <path
          d="M16.5 2.201h-15a.5.5 0 00-.5.5v12.598a.5.5 0 00.5.5h15a.5.5 0 00.5-.5V2.701a.5.5 0 00-.5-.5z"
          fill="url(#machineLearningSvcs_a)"
        />
        <path d="M16.5 2.201h-15a.5.5 0 00-.5.5v1.5h16v-1.5a.5.5 0 00-.5-.5z" fill="#0078d4" />
        <path
          d="M2 3.201a.25.25 0 11-.25-.25.25.25 0 01.25.25zM3 3.201a.25.25 0 11-.25-.25.25.25 0 01.25.25zM4 3.201a.25.25 0 11-.25-.25.25.25 0 01.25.25z"
          fill="#fff"
        />
        <path
          d="M13.5 9.201h-9a.5.5 0 010-1h9a.5.5 0 010 1zM13.5 11.201h-9a.5.5 0 010-1h9a.5.5 0 010 1zM13.5 13.201h-9a.5.5 0 010-1h9a.5.5 0 010 1z"
          fill="#fff"
        />
        <path d="M13.5 7.201h-9a.5.5 0 010-1h9a.5.5 0 010 1z" fill="#50e6ff" />
      </svg>
    ),
  }

  return <>{icons[iconName] || <div className={standardClassName}></div>}</>
}

