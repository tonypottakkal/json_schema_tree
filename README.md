# JSON Schema Tree Visualization

This project aims to provide a visual representation of JSON schema data in a collapsible tree format. It's particularly useful for understanding the structure of complex JSON documents and communicating them with non-technical team members.

## Overview

The schema of datasets is often represented in a .json file according to the JSON Draft-07 Schema format. However, understanding the hierarchical structure of these schemas can be challenging, especially when dealing with deeply nested data. This project addresses this challenge by visualizing the JSON schema as a graph, where each node represents a key or attribute in the schema, and edges connect parent nodes to their children.

## Features

- Converts JSON schema data into a hierarchical format suitable for visualization.
- Renders the hierarchical data as a collapsible tree, where users can expand or collapse nodes to explore the schema's structure.
- Colors nodes based on their type to provide visual cues.
- Labels vertices with names (for objects) used to identify the node, enhancing readability.

## Usage

1. Prepare your JSON schema data in accordance with the JSON Draft-07 Schema format.
2. Clone this project into a local directory. 
3. Open the `index.html`, in a supported webrowser.
4. Click on choose file and select a json schem file to view the visualization.

## External Resources

- A similar project for JSON data visualization as a collapsible tree can be found at [ranvirparmar/d3interactivetree](https://github.com/ranvirparmar/d3interactivetree).
- Observable also provides a collapsible-tree example at (https://observablehq.com/@d3/collapsible-tree).

## Limitations

- The JSON Schema format, while powerful for describing data structures and validation rules, is not inherently hierarchical. As a result, additional processing is required to transform it into a format suitable for visualization.
- The `transformSchemaToHierarchy` function provided in `main.js` is the utilized to transform your JSON schema into a hierarchical format.
- This project provides a standalone webpage for creating schema-tree visualizations since Observable notebooks cannot be used in certain environments.
- D3.js supports recent browsers such as Chrome, Edge, Firefox, and Safari. It requires a modern browser to make use of SVG and CSS3 transitions. It is not supported by Internet Explorer 8 and older versions.

## License

This project is licensed under the [MIT License](LICENSE).

