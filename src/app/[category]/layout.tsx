import { Logo } from "@/components/ui/logo";
import { LEARNING_CATEGORIES } from "@/constants/categories";

interface CategoryLayoutProps {
  children: React.ReactNode;
  params: { category: string };
}

export async function generateMetadata({
  params,
}: Pick<CategoryLayoutProps, "params">) {
  const category = LEARNING_CATEGORIES.find((c) => c.id === params.category);

  return {
    title: category ? `Learn Thai - ${category.title}` : "Learn Thai",
    description:
      category?.description ||
      "Learn Thai language through interactive exercises",
  };
}

export default function CategoryLayout({ children }: CategoryLayoutProps) {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="mb-8">
        <Logo />
      </div>
      {children}
    </div>
  );
}
