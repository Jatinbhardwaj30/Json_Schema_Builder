Unique JSON Schema Builder
This is a user-friendly tool to help you build JSON schemas visually. You can easily add, remove, and reorder fields, define data types, and even create complex nested structures. The application provides a real-time preview of the JSON output that updates as you build your schema.

<----------------------------------------------------------------->

Features ->

Visual Schema Creation: Easily define the structure of your JSON data using an intuitive user interface.

Real-time JSON Output: As you build your schema, you'll see a live preview of the JSON output, helping you understand how your schema translates into actual data.

Field Types: Support for various field types:

String: For text values.

Number: For numerical values.

Boolean: For true/false values.

Nested: Create nested objects to organize related fields.

Array: Define arrays of strings, numbers, booleans, or even nested objects.

Dynamic Field Management:

Add Fields: Quickly add new fields to your schema.

Remove Fields: Easily delete fields you no longer need.

Drag-and-Drop Reordering: Rearrange the order of your fields by simply dragging and dropping them into place.

Field Validation:

Required Fields: Ensure essential fields are not left empty.

Unique Keys: Prevent duplicate field names within the same level of the schema.

Collapse/Expand Nested Fields: Keep your workspace tidy by collapsing or expanding nested object and array fields.

Local Storage Persistence: Your schema is automatically saved to your browser's local storage, so your work is preserved even if you close and reopen the browser.

Copy to Clipboard: One-click functionality to copy the generated JSON output to your clipboard.

Clear All: Easily reset the entire schema with a single button.


<------------------------------------------------------------>

Technologies Used ->

This project is built with a modern web stack, including:

React: A popular JavaScript library for building user interfaces.

TypeScript: Adds static typing to JavaScript to improve code quality and readability.

Ant Design: A UI library with a set of high-quality React components.

React Hook Form: For efficient and flexible form management.

React Beautiful DnD: To enable smooth drag-and-drop functionality.

<------------------------------------------------------------------->

How to Use ->

Add Fields: Click the "Add Field" button to add a new field to your schema.

Define Field Properties: For each field, you can set its:

Field Name: The key for your JSON property.

Type: Choose from String, Number, Boolean, Nested, or Array.

Array Type (if Array selected): Specify the type of elements within your array (e.g., "of Strings", "of Nested Objects").

Create Nested Structures: If you select "Nested" or "Array" of "Nested" type, a sub-builder will appear, allowing you to define fields within that nested structure.

Reorder Fields: Click and drag the "Holder" icon next to any field to change its position.

Remove Fields: Click the "Close" (X) icon to delete a field.

Collapse/Expand: Use the arrow icons to collapse or expand nested sections for better readability.

View JSON Output: The right panel will continuously update to show the real-time JSON generated from your schema.

Copy JSON: Click the "Copy" button above the JSON output to copy it to your clipboard.

Clear All: Click the "Clear All" button to remove all fields from your schema.

<--------------------------------------------->

File Structure ->

-> `App.tsx` — Main app logic and layout.
-> `SchemaBuilder.tsx` — Handles rendering and drag/drop of schema fields.
-> `SchemaRow.tsx` — Renders a single field row (with controls).
-> `types.ts` — TypeScript types for schema fields.
-> `App.css` — Custom styles for a modern UI.
-> `index.css` — Global and body styles.


<---------------------------------------------------------------->

 Example Use Cases ->

-> Quickly prototype JSON data structures.
-> Generate sample JSON for APIs or forms.
-> Teach or learn about JSON schemas and nesting.


<------------------------------------------------------------------>

 Running the Project ->

1. **Install dependencies:**  
   `npm install`
2. **Start the app:**  
   `npm start`
3. **Open in browser:**  
   Visit [http://localhost:3000](http://localhost:3000)




