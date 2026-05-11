# Styling Strategy & Guidelines

- **Primary Tool:** Quasar CSS Utility Classes (Flexbox, Spacing, Typography).
- **Custom Styles:** Use SCSS only when Quasar utilities are insufficient.
- **Organization:**
  - All custom SCSS must live in the `/src/css/` directory.
  - Organize by features (e.g., `/src/css/features/_auth.scss`).
  - Use a central `app.scss` to import feature files.
- **Naming:** Follow BEM (Block Element Modifier) for custom SCSS classes.
- **Variables:** Always prioritize Quasar's SCSS variables (`$primary`, `$secondary`, etc.) before defining new ones.
