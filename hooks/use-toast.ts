import { toast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive" | "success";
};

export const useToast = () => {
  const showToast = ({ 
    title, 
    description, 
    action, 
    variant = "default", 
    ...props 
  }: ToastProps) => {
    return toast(title, {
      description,
      action,
      className: variant,
      ...props,
    });
  };

  return {
    toast: showToast,
  };
};