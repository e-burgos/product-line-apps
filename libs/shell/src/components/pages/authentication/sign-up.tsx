import Logo from 'libs/ui/src/components/logo';
import Image from 'libs/ui/src/components/image';
import SignUpForm from 'libs/ui/src/components/auth/sign-up-form';
import AnchorLink from 'libs/ui/src/components/links/anchor-link';

// import images and icons
import GoogleIcon from 'libs/ui/src/assets/images/google-icon.svg';

export function SignUpPage({ signInPath }: { signInPath: string }) {
  return (
    <>
      <div className="grid flex-grow grid-cols-1 gap-0 lg:grid-cols-[1fr_0%] 3xl:grid-cols-2">
        <div className="flex items-center justify-center py-14">
          <div className="grid w-full max-w-[408px] grid-cols-1 gap-4 px-4">
            <div className="mx-auto mb-2 w-20 lg:ml-0 xl:w-24">
              <Logo className="!w-full" />
            </div>
            <div className="mb-5 text-center lg:text-left">
              <h2 className="mb-2 text-xl font-medium uppercase dark:text-white lg:text-2xl">
                Create New Account
              </h2>
              <p className="text-sm text-[#4B5563] dark:text-gray-300">
                Welcome! Lets fill information and create account
              </p>
            </div>
            <button className="flex w-full items-center justify-center gap-2.5 rounded-md border-2 border-[#F3F4F6] bg-[#F3F4F6] py-2 text-sm font-medium text-black transition-all hover:bg-transparent dark:border-brand dark:bg-brand dark:text-gray-300 dark:hover:bg-transparent sm:rounded-lg sm:tracking-[0.04em]">
              <div className="relative h-5 w-5 sm:h-7 sm:w-7">
                <Image src={GoogleIcon} alt="google-icon" />
              </div>
              Sign up with Google
            </button>
            <p className="flex items-center justify-center gap-3 text-sm text-[#4B5563] before:h-[1px] before:w-full before:border-t before:border-dashed after:h-[1px] after:w-full after:border-t after:border-dashed dark:text-gray-300 dark:before:border-gray-500 dark:after:border-gray-500 ">
              or
            </p>
            <SignUpForm />
            <p className="text-sm tracking-[0.5px] text-[#4B5563] dark:text-gray-300">
              Already have an account?
              <AnchorLink
                to={signInPath}
                className="ml-2 font-medium underline dark:text-gray-300"
              >
                Sign In
              </AnchorLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
