
// FIX: Removed React import and updated components to not use React.FC to resolve "Duplicate identifier 'React'" error.

export const SparkleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z" />
    <path d="M5 2v4" />
    <path d="M19 20v-4" />
    <path d="M22 5h-4" />
    <path d="M2 19h4" />
  </svg>
);

export const ImageIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);

export const ReelIcon = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}>
            <path d="M12 12v2"/>
            <path d="M15.6 10.4 14 12l1.6 1.6"/>
            <path d="M8.4 10.4 10 12l-1.6 1.6"/>
            <path d="M16 4H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"/>
            <path d="M6 8h.01"/><path d="M6 12h.01"/><path d="M6 16h.01"/><path d="M18 8h-.01"/><path d="M18 12h-.01"/><path d="M18 16h-.01"/>
    </svg>
);

export const CarouselIcon = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}>
            <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 3v18"/><path d="M16 3v18"/><path d="M3 8h18"/><path d="M3 16h18"/>
    </svg>
);

export const PlusIcon = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}>
            <path d="M5 12h14"/><path d="M12 5v14"/>
    </svg>
);

export const LoaderIcon = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}>
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
);

export const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const InstagramIcon = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}>
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
);

export const BrainCircuitIcon = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}>
        <path d="M12 5a3 3 0 1 0-5.993.142"/>
        <path d="M18 5a3 3 0 1 0-5.993.142"/>
        <path d="M18 11a3 3 0 1 0-6 0"/>
        <path d="M12 11a3 3 0 1 0-6 0"/>
        <path d="M6 5a3 3 0 1 0-5.993.142"/>
        <path d="M6 11a3 3 0 1 0-5.993.142"/>
        <path d="M12 17a3 3 0 1 0-5.993.142"/>
        <path d="M18 17a3 3 0 1 0-5.993.142"/>
        <path d="M21 5h-1"/><path d="M3 5h1"/><path d="M21 11h-1"/><path d="M3 11h1"/><path d="M21 17h-1"/><path d="M3 17h1"/>
        <path d="M12 2v1"/><path d="M12 8v1"/><path d="M12 14v1"/><path d="M12 20v1"/>
        <path d="m15.856 6.857 1-1"/><path d="m8.144 12.857 1-1"/><path d="m8.144 6.857-1-1"/><path d="m15.856 12.857-1-1"/>
        <path d="m15.856 18.857 1-1"/><path d="m8.144 18.857-1-1"/>
        <path d="M9 11h1"/><path d="M15 11h1"/><path d="M9 17h1"/><path d="M15 17h1"/><path d="M9 5h1"/><path d="M15 5h1"/>
    </svg>
);

export const RocketLaunchIcon = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}>
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.18-.65-.87-2.2-.86-3.05.08z"/>
            <path d="M12 15h.01"/><path d="m21.5 2.5-19 19"/>
            <path d="M11.5 12.5c0 .28.22.5.5.5s.5-.22.5-.5-.22-.5-.5-.5-.5.22-.5.5z"/>
            <path d="M12 12h.01"/>
            <path d="M18.5 5.5c0 .28.22.5.5.5s.5-.22.5-.5-.22-.5-.5-.5-.5.22-.5.5z"/>
            <path d="M19 5h.01"/>
            <path d="m15 15-3.4-3.4"/>
            <path d="M9 9l-3.4-3.4"/>
            <path d="M12.5 11.5 9 8"/>
            <path d="m16 12-3.4-3.4"/>
            <path d="m15 9-1.4-1.4"/>
            <path d="M7.5 4.5 9 3l-1.5-1.5L6 3l1.5 1.5z"/>
    </svg>
);

export const TargetIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);

export const EyeIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
);

export const MicrophoneIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
);

export const BalanceIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m16 16 3-8 3 8c-2 1-4 1-6 0"/><path d="m2 16 3-8 3 8c-2 1-4 1-6 0"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/></svg>
);

export const CheckIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5"/></svg>
);

export const ThumbsUpIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 10v12"/><path d="M18 10V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2h-3z"/></svg>
);

export const HomeIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);

export const BarChartIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
);

export const UsersIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

export const KeyIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
);

export const BookOpenIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);

export const MenuIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);

export const TikTokIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.98-1.55-2-2.31-4.52-2.3-7.09 0-2.64 1.14-5.26 3.1-7.12 1.83-1.72 4.3-2.58 6.78-2.58.01 2.11-.01 4.22.02 6.33-.02 1.43-.63 2.82-1.7 3.88-1.05 1.04-2.57 1.58-4.06 1.66-1.14.06-2.28-.2-3.3-.79-.9-.51-1.63-1.26-2.19-2.23-.39-.7-.61-1.48-.68-2.29-.04-1.33.16-2.67.63-3.92.35-.94.85-1.83 1.5-2.61.42-.5.88-.95 1.39-1.36.7-.58 1.48-1.04 2.3-1.37.81-.33 1.65-.55 2.5-.66.86-.12 1.74-.1 2.62-.06Z"/>
  </svg>
);

export const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M2.5 14.25c-.32 0-.5.25-.5.57v1.36c0 .32.18.57.5.57h2.53c.32 0 .5-.25.5-.57v-1.36c0-.32-.18-.57-.5-.57H2.5zm18.42-3.02c.28 0 .5.22.5.5v3.03c0 .28-.22.5-.5.5h-2.53c-.28 0-.5-.22-.5-.5v-3.03c0-.28.22-.5.5-.5h2.53zm-9.42 2.02c.32 0 .5.26.5.57v1.36c0 .31-.18.57-.5.57h-2.53c-.32 0-.5-.26-.5-.57v-1.36c0-.31.18-.57.5-.57h2.53zM12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
    <path d="M15.5 10.53a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-5zm-2 3a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1z"/>
  </svg>
);

export const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.17,6.35c-1.12-1.17-2.3-1.42-3.88-1.42C5.35,4.93,2,8.27,2,12.21c0,3.94,3.35,7.28,7.29,7.28,4.19,0,7.04-3.48,7.04-7.28,0-1.29-.42-2.3-1.1-3.23Zm-1.46,8.23c-1.3,0-2.35-1.06-2.35-2.35S10.41,9.88,11.71,9.88s2.35,1.06,2.35,2.35S13.01,14.58,11.71,14.58Z"/>
    <path d="M22,12.21c0-4.19-3.48-7.04-7.28-7.04-1.59,0-2.71,.25-3.88,1.42,1.35-1.03,2.83-1.63,4.39-1.63,4.08,0,7.79,3.53,7.79,7.24s-3.71,7.24-7.79,7.24c-1.56,0-3.04-.6-4.39-1.63,1.17,1.17,2.3,1.42,3.88,1.42,3.94,0,7.28-3.35,7.28-7.28Z"/>
  </svg>
);

export const PinterestIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.938 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.117.223.084.345l-.333 1.35c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.343 2.308.535 3.554.535 6.627 0 12-5.373 12-12s-5.373-12-12-12z"/>
  </svg>
);

export const RedditIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.834 13.237c.763 0 1.381.619 1.381 1.381 0 .763-.618 1.381-1.381 1.381-.763 0-1.381-.618-1.381-1.381 0-.762.618-1.381 1.381-1.381zm5.667 0c.763 0 1.381.619 1.381 1.381 0 .763-.618 1.381-1.381 1.381-.763 0-1.381-.618-1.381-1.381 0-.762.618-1.381 1.381-1.381zm1.613-2.64c-.115.342-.413.585-.776.585-.417 0-.773-.289-.869-.694-1.075.313-2.388.489-3.693.513l.816-2.583 2.029.479c.045-.4.246-.762.533-1.012.313-.276.713-.438 1.139-.438.931 0 1.685.754 1.685 1.685 0 .42-.156.806-.413 1.107zm-7.98-2.103c0-.931.754-1.685 1.685-1.685.426 0 .826.162 1.139.438.287.25.488.613.533 1.012l2.029-.479.816 2.583c-1.305-.024-2.618-.2-3.693-.513-.096.405-.452.694-.869.694-.363 0-.661-.243-.776-.585-1.428.13-2.734.523-3.873 1.139-.23-.298-.363-.656-.363-1.042 0-1.287 1.045-2.332 2.332-2.332.263 0 .515.044.752.126zm-1.12 7.151c-.693.693-1.614 1.139-2.597 1.139-.115 0-.23-.008-.344-.024-.23-.033-.452-.088-.667-.161l-.004-.002c-.896-.307-1.571-1.168-1.571-2.169 0-.428.122-.828.344-1.183.828-1.313 2.459-2.222 4.223-2.222.189 0 .375.012.558.033.45.055.882.162 1.291.313.255.093.498.209.729.342.661.383 1.229.896 1.667 1.526 1.258-1.266 1.242-3.328.002-4.577-.13-.133-.264-.26-.4-.383-.377-.333-.79-.607-1.233-.816-1.116-.525-2.348-.838-3.649-.838-1.332 0-2.591.325-3.738.896-.307.155-.603.327-.882.513-.373.245-.717.525-1.026.838-.133.132-.26.269-.383.407-1.205 1.3-1.248 3.324.004 4.571.215.213.44.413.675.596.533.418 1.144.739 1.821.942.513.152 1.056.241 1.618.262.13.003.259.004.387.004.898 0 1.745-.395 2.362-1.012.618-.618.966-1.432.966-2.298 0-.898-.383-1.723-1.04-2.334z"/>
  </svg>
);

export const BlueskyIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.5 15.25c-.225 0-.45-.04-.663-.122-1.35-.526-2.588-1.328-3.563-2.355-1.001-1.054-1.726-2.328-2.075-3.758-.045-.18-.075-.368-.075-.556v-.888c0-1.425.825-2.67 2-3.262.225-.105.488-.135.738-.075.615.15 1.087.66 1.162 1.29.09.735-.345 1.41-1.035 1.62-1.065.33-2.295-.315-2.595-1.365-.135-.45.06-.945.48-1.125.12-.06.255-.075.39-.045.165.045.3.15.375.315.06.135.09.285.09.435v.78c0 .12.015.24.045.36.27 1.11.84 2.115 1.65 2.985.81 0.87 1.815 1.545 2.925 2.01.15.06.285.135.405.24.135.12.225.27.285.435.15.42-.045.885-.435 1.11-.195.12-.42.18-.645.18z"/>
  </svg>
);

export const GridIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="3" rx="2"/><rect width="7" height="7" x="3" y="3"/><rect width="7" height="7" x="14" y="3"/><rect width="7" height="7" x="14" y="14"/><rect width="7" height="7" x="3" y="14"/></svg>
);

export const MapIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" x2="8" y1="2" y2="18"/><line x1="16" x2="16" y1="6" y2="22"/></svg>
);

export const GoogleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C14.03,4.73 15.6,5.33 16.59,6.23L18.83,4C16.93,2.27 14.7,1 12.19,1C6.92,1 3,5.5 3,12C3,18.5 6.92,23 12.19,23C17.5,23 21.5,18.88 21.5,12.5C21.5,11.97 21.45,11.51 21.35,11.1Z"/>
    </svg>
);

export const ImageEditIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m13.5 21-3-3L2 22l-1-1 8.5-8.5-3-3-6 6-1-1 6-6-3-3 6-6-1-1 6 6-3 3 8.5 8.5-1 1-10.5-10.5Z"/><path d="m14.5 6.5 3 3"/>
    </svg>
);

export const SquareIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="18" height="18" x="3" y="3" rx="2"/>
    </svg>
);

export const RectangleVerticalIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="14" height="20" x="5" y="2" rx="2"/>
    </svg>
);

export const RectangleHorizontalIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="14" x="2" y="5" rx="2"/>
    </svg>
);

export const LinkIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/>
    </svg>
);