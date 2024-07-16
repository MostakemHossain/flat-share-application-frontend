import Navbar from "@/components/Shared/Navbar/Navbar";

const commonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default commonLayout;
