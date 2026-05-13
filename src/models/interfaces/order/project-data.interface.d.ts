/**
 * Represents project scope and deliverables in an order.
 * 
 * Contains project details including title, priority level, description, and reference files.
 * Used in the multi-step order creation dialog (second step: Project Information).
 * Priority typically uses standard levels: "Baja" (Low), "Media" (Medium), "Alta" (High).
 * 
 * @interface IProjectData
 * @property {string} title - Project title or name
 * @property {string} priority - Project priority level (Baja/Media/Alta or similar)
 * @property {string} [description] - Optional: Detailed project description and requirements
 * @property {File[]} [files] - Optional: Array of reference files or specifications (File objects from upload)
 */
export interface IProjectData {
  title: string;
  priority: string;
  description?: string;
  files?: File[];
}
