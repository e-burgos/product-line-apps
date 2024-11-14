/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from '../forms/input';
import Button from '../button/button';
import { useNavigate } from 'react-router-dom';

export function ForgetPasswordForm({ resetPinPath }: { resetPinPath: string }) {
  const navigate = useNavigate();
  function handleSubmit(e: any) {
    e.preventDefault();
    navigate(resetPinPath);
    console.log(e);
  }

  return (
    <form
      noValidate
      onSubmit={(value) => handleSubmit(value)}
      className="grid grid-cols-1 gap-4"
    >
      <div>
        <p className="mb-2.5 text-left text-sm font-medium text-[#6B7280] rtl:text-right dark:text-gray-300">
          Email Address
        </p>
        <Input
          type="email"
          placeholder="Enter your email"
          inputClassName="focus:!ring-0 placeholder:text-[#6B7280] !mt-0"
        />
      </div>
      <Button
        type="submit"
        className="mt-5 rounded-lg !text-sm uppercase tracking-[0.04em]"
      >
        Send Reset code
      </Button>
    </form>
  );
}

export default ForgetPasswordForm;
