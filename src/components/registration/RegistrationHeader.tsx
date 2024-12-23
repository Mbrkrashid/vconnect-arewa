interface RegistrationHeaderProps {
  title: string;
  description: string;
}

export const RegistrationHeader = ({ title, description }: RegistrationHeaderProps) => {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-3xl font-bold text-primary">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};