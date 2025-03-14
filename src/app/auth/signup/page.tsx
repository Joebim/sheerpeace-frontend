import { RegisterForm } from "@/components/register-form";
import Image from "next/image";
import SheerpeaceWordmark from "../../../../public/sheerpeace-word-mark.svg";
import SheerpeaceLogo from "../../../../public/sheerpeace-logo.svg";
import { renderImageUrl } from "@/hooks/useRenderImageUrl";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center font-medium">
            <SheerpeaceLogo className="w-[25px]" />
            <SheerpeaceWordmark className="fill-sheerpeace-purple-secondary scale-75" />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src={renderImageUrl("/uploads/images/1741262206350-125433806.png")}
          alt="Image"
          height={800}
          width={800}
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          priority
        />
      </div>
    </div>
  );
}
