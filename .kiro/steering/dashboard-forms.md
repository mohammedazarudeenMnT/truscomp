---
inclusion: always
---

# Dashboard Form Standards

## Form Layout Standards

All dashboard forms MUST follow these responsive design patterns:

### Structure

```tsx
<form onSubmit={handleSubmit} className="space-y-6">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Main Content Column */}
    <div className="lg:col-span-2 space-y-6">
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Section Title</h3>
        <div className="space-y-4">
          {/* Form fields */}
        </div>
      </div>
    </div>

    {/* Sidebar Column */}
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Settings</h3>
        <div className="space-y-4">
          {/* Settings fields */}
        </div>
      </div>
    </div>
  </div>

  {/* Action Buttons */}
  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">
    <Button type="button" variant="outline" onClick={() => router.back()}>
      Cancel
    </Button>
    <Button type="submit" disabled={isLoading}>
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      Save
    </Button>
  </div>
</form>
```

## Responsive Design Rules

1. **Grid Layout**: Use `grid-cols-1 lg:grid-cols-3` for main/sidebar layout
2. **Card Sections**: Group related fields in cards with titles
3. **Mobile First**: Stack vertically on mobile, side-by-side on desktop
4. **Spacing**: Use `space-y-6` for sections, `space-y-4` for fields
5. **Action Buttons**: Place at bottom with border-top separator

## Image Upload Pattern

Always use the reusable `ImageUpload` component:

```tsx
import { ImageUpload } from "@/components/ui/image-upload";

// In component
const [formData, setFormData] = useState({
  image: null as string | null,
  // other fields...
});

const handleImageChange = (value: string | null) => {
  setFormData({ ...formData, image: value });
};

// In JSX
<ImageUpload
  label="Upload image description"
  value={formData.image}
  onChange={handleImageChange}
  aspectRatio="wide" // or "square"
/>
```

## Card Section Pattern

```tsx
<div className="bg-card border border-border rounded-xl p-6 shadow-sm">
  <h3 className="text-lg font-semibold mb-4">Section Title</h3>
  <div className="space-y-4">
    {/* Fields go here */}
  </div>
</div>
```

## Form Field Pattern

```tsx
<div className="grid gap-2">
  <Label htmlFor="fieldName">Field Label</Label>
  <Input
    id="fieldName"
    placeholder="Enter value..."
    value={formData.fieldName}
    onChange={(e) => setFormData({ ...formData, fieldName: e.target.value })}
    required
  />
</div>
```

## Textarea Pattern

```tsx
<div className="grid gap-2">
  <Label htmlFor="content">Content</Label>
  <Textarea
    id="content"
    placeholder="Enter content..."
    value={formData.content}
    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
    rows={4}
    className="min-h-[300px] md:min-h-[400px]" // Responsive height
  />
</div>
```

## Select Pattern

```tsx
<div className="grid gap-2">
  <Label>Category</Label>
  <Select
    value={formData.category}
    onValueChange={(value) => setFormData({ ...formData, category: value })}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select option" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
    </SelectContent>
  </Select>
</div>
```

## Switch Pattern

```tsx
<div className="flex items-center gap-2">
  <Switch
    id="isActive"
    checked={formData.isActive}
    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
  />
  <Label htmlFor="isActive">Enable this feature?</Label>
</div>
```

## Loading States

Always show loading states on buttons:

```tsx
<Button type="submit" disabled={isLoading}>
  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
  {isEditing ? "Update" : "Create"}
</Button>
```

## Mobile Responsiveness Checklist

✅ Forms stack vertically on mobile (< 1024px)
✅ Cards have proper padding on all screen sizes
✅ Buttons stack vertically on mobile with `flex-col sm:flex-row`
✅ Textareas have responsive heights
✅ Action buttons at bottom with proper spacing
✅ All touch targets are at least 44x44px
✅ No double scrollbars (avoid sticky positioning on forms)

## Examples

✅ **Correct:**
```tsx
<div className="bg-card border border-border rounded-xl p-6 shadow-sm">
  <h3 className="text-lg font-semibold mb-4">Post Content</h3>
  <div className="space-y-4">
    <div className="grid gap-2">
      <Label htmlFor="title">Title</Label>
      <Input id="title" value={formData.title} onChange={handleChange} />
    </div>
  </div>
</div>
```

❌ **Incorrect:**
```tsx
<div className="p-4">
  <h3>Post Content</h3>
  <Label>Title</Label>
  <Input value={formData.title} onChange={handleChange} />
</div>
```

## Reusable Components

- `ImageUpload` - For all image uploads
- `PageContainer` - For page wrapper
- `PageHeader` - For page headers
- `Card` - For content sections (use with proper styling)
