interface LoadingSpinnerProps {
    size?: "small" | "medium" | "large"
  }
  
  export default function LoadingSpinner({ size = "medium" }: LoadingSpinnerProps) {
    const sizeClasses = {
      small: "h-8 w-8",
      medium: "h-12 w-12",
      large: "h-16 w-16",
    }
  
    return (
      <div className="flex justify-center items-center w-full h-full mt-20">
        <div className={`animate-spin rounded-full ${sizeClasses[size]} border-t-2 border-b-2 border-primary text-teal-500 `}></div>
      </div>
    )
  }
  
  