import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

export default function Input({ placeholder, ...rest }: InputProps) {
  return (
    <input
      placeholder={placeholder}
      className="border rounded-xl px-3 py-2 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
      {...rest}
    />
  );
}
