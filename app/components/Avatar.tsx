import Image from "next/image";

interface AvatarProps {
    avatarImg? : string;
    isProfileComplete? : boolean | undefined;

}

export default function Avatar({ avatarImg, isProfileComplete } : AvatarProps) {
  return (
    <div className="relative flex h-14 w-14 items-center p-1 justify-center rounded-full bg-[#EEEDFC]" >
                {avatarImg && avatarImg?.trim().length > 0 ?
                <Image 
                src={avatarImg || ""}
                alt="User avatar"
                fill
                className="object-contain rounded-full auto" /> 
                :
                <svg width="30" height="30" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M74.4166 82.25V74.4167C74.4166 70.2616 72.7661 66.2767 69.828 63.3387C66.8899 60.4006 62.905 58.75 58.75 58.75H35.25C31.0949 58.75 27.11 60.4006 24.172 63.3387C21.2339 66.2767 19.5833 70.2616 19.5833 74.4167V82.25" stroke="#4F46E5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M47 43.0833C55.6524 43.0833 62.6666 36.0691 62.6666 27.4167C62.6666 18.7642 55.6524 11.75 47 11.75C38.3475 11.75 31.3333 18.7642 31.3333 27.4167C31.3333 36.0691 38.3475 43.0833 47 43.0833Z" stroke="#4F46E5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>}

                <svg width="14" height="14" viewBox="0 0 18 18" fill="none" className="absolute bottom-px right-0.5" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="9" r="8" 
                        fill={ isProfileComplete === undefined ? "#F4A316" : isProfileComplete === true ? "#1DC31D" : "#F4A316"} 
                        stroke="white" strokeWidth="2"/>
                </svg>
            </div>
  )
}
