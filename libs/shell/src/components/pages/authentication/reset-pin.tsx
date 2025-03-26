import { useState } from 'react';
import Logo from 'libs/ui/src/components/logo';
import ResetPinForm from 'libs/ui/src/components/auth/reset-pin-form';

export function ResetPinPage({ signInPath }: { signInPath: string }) {
  const [_value, setValue] = useState<string>('');

  return (
    <div className="grid flex-grow grid-cols-1 gap-0 lg:grid-cols-[1fr_0%] 3xl:grid-cols-1">
      <div className="flex flex-grow items-center justify-center py-14">
        <div className="w-full max-w-[494px] px-4 text-center">
          <div className="mx-auto mb-4 w-20 xl:w-24 2xl:mb-8">
            <Logo className="!w-full" />
          </div>
          <h2 className="mb-4 text-xl font-medium uppercase dark:text-white lg:text-2xl 2xl:mb-8">
            Enter Pin
          </h2>
          <p className="mb-8 text-sm leading-7 text-[#4B5563] dark:text-gray-300 2xl:mb-12">
            We emailed you the six digit code to{' '}
            <span className="font-medium">deny@deny.com</span> Enter the code
            below to confirm your email address.
          </p>
          <ResetPinForm signInPath={signInPath} setValue={setValue} />
          <p className="text-xs tracking-[0.5px] text-[#4B5563] dark:text-gray-300 sm:text-sm">
            Didn&apos;t received the code?
            <span className="ml-1 cursor-pointer font-medium underline">
              Resend it!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPinPage;
