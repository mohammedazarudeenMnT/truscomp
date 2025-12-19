import BlogForm from "@/components/dashboard/blogs/blog-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-components";

export default function NewBlogPage() {
  return (
    <PageContainer maxWidth="full">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/content/blogs">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Create Blog Post</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Share insights, updates, and stories with your audience
          </p>
        </div>
      </div>

      <div className="pb-8">
        <BlogForm />
      </div>
    </PageContainer>
  );
}
