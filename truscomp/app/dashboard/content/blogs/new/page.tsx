import BlogForm from "@/components/dashboard/blogs/blog-form";
import { PageContainer } from "@/components/ui/page-components";

export default function NewBlogPage() {
  return (
    <PageContainer maxWidth="full">
      <div className="pb-8">
        <BlogForm />
      </div>
    </PageContainer>
  );
}
