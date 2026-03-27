type HeaderProps = {
  displayName: string;
};

export function Header({ displayName }: HeaderProps) {
  return (
    <div className="flex flex-col items-center mt-8">
      <p className="text-lg md:text-xl font-semibold">Hello,</p>
      <p className="text-lg md:text-xl font-semibold mt-1 text-center">
        {displayName}
      </p>
    </div>
  );
}
