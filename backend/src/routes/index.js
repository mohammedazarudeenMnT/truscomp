import authRoutes from "./auth.routes.js";
import settingsRoutes from "./settings/settings.routes.js";
import themeSettingsRoutes from "./settings/themeSettings.routes.js";
import pageSEORoutes from "./settings/pageSEO.routes.js";
import serviceRoutes from "./content/service.routes.js";
import servicesPageRoutes from "./content/servicesPage.routes.js";
import blogRoutes from "./content/blog.routes.js";
import categoryRoutes from "./content/category.routes.js";

export default function registerRoutes(app) {
  // Mount sub-routers under their API prefixes
  app.use("/api/auth", authRoutes);
  app.use("/api/settings", settingsRoutes);
  app.use("/api/theme-settings", themeSettingsRoutes);
  app.use("/api/page-seo", pageSEORoutes);
  app.use("/api/services", serviceRoutes);
  app.use("/api/services-page-settings", servicesPageRoutes);
  app.use("/api/blog", blogRoutes);
  app.use("/api/categories", categoryRoutes);
}
