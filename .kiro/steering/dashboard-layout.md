---
inclusion: always
---

# Dashboard Layout Standards

## Page Container Standards

All dashboard pages MUST use the `PageContainer` component with consistent spacing:

```tsx
import { PageContainer, PageHeader } from "@/components/ui/page-components";

export default function YourPage() {
  return (
    <PageContainer maxWidth="full">
      <PageHeader
        title="Page Title"
        subtitle="Page description"
        action={<Button>Action</Button>}
      />
      
      {/* Page content */}
    </PageContainer>
  );
}
```

## Spacing Rules

1. **Container**: Always use `PageContainer` with `maxWidth="full"`
2. **Padding**: Container provides `px-4 py-6` (DO NOT add extra padding)
3. **Header**: Always use `PageHeader` component for consistency
4. **Content**: Direct children of PageContainer, no extra wrappers

## Component Structure

```
PageContainer (px-4 py-6)
  └─ PageHeader (mb-8)
  └─ Content sections (space-y-6)
```

## Examples

✅ **Correct:**
```tsx
<PageContainer maxWidth="full">
  <PageHeader title="Services" subtitle="Manage services" />
  <div className="space-y-6">
    {/* Stats cards */}
    {/* Content */}
  </div>
</PageContainer>
```

❌ **Incorrect:**
```tsx
<div className="p-6 max-w-7xl mx-auto">  {/* Don't use custom padding */}
  <h1>Services</h1>
  {/* Content */}
</div>
```

## Reusable Components

- `PageContainer` - Main page wrapper
- `PageHeader` - Consistent page headers
- `StatsCard` - Dashboard statistics cards
