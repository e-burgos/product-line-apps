import Input from "@/components/ui/forms/input";
import Button from "@/components/ui/button/button";
import { useNavigate } from "react-router-dom";
import { routePaths } from "@/app/router/routes";

export default function ForgetPasswordForm() {
  const navigate = useNavigate();
  function handleSubmit(e: any) {
    e.preventDefault();
    navigate(routePaths.resetPin);
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
