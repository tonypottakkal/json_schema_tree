document.getElementById('fileUploader').addEventListener('change', function(event) {
    const input = event.target;
    if ('files' in input && input.files.length > 0) {
        readFileContent(input.files[0]).then(content => {
            const jsonData = JSON.parse(content);
            renderTree(transformData(jsonData)); // Transform and then render the tree
        }).catch(error => console.log(error));
    }
});

function readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsText(file);
    });
}

function transformData(data) {
    // Function to transform schema into a hierarchical format
    function buildHierarchy(item) {
        // Function to recursively build the hierarchy from the schema
        function recurse(name, obj) {
            const node = { name: name };
            if (obj.type && obj.type === 'object' && obj.properties) {
                node.children = Object.entries(obj.properties).map(([key, value]) => 
                    recurse(key, value)
                );
            } else if (obj.type && obj.type === 'array' && obj.items) {
                // Assuming arrays contain objects
                node.children = [recurse(name, obj.items)];
            }
            return node;
        }
        return recurse('Root', item); // Start recursion with the root item
    }

    return buildHierarchy(data);
}

// color scale for node types
const colorScale = {
    object: "#ff7f0e",
    array: "#2ca02c",
    string: "#1f77b4",
    // Add more types as needed
};

function renderTree(rootData) {
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;

    const margin = {top: 0, right: 50, bottom: 0, left: 75};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select('svg')
        .attr('width', width)
        .attr('height', height);

    // Clear previous contents
    svg.html("");

    const zoomG = svg.append('g');
    const g = zoomG.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    svg.call(d3.zoom().on('zoom', (event) => {
        zoomG.attr('transform', event.transform);
    }));

    const root = d3.hierarchy(rootData);

    const treeLayout = d3.tree().size([innerHeight, innerWidth]);

    treeLayout(root);

    g.selectAll('.link')
      .data(root.links())
      .enter().append('path')
        .attr('class', 'link')
        .attr('d', d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x))
        .attr('stroke', '#555')
        .attr('fill', 'none');

    const node = g.selectAll('.node')
      .data(root.descendants())
      .enter().append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.y},${d.x})`);

    node.append('circle')
        .attr('r', 5)
        .style('fill', d => colorScale[d.data.type] || '#ccc'); // Apply color coding based on type;

    node.append('text')
        .attr('dy', '0.32em')
        .attr('x', d => d.children ? -8 : 8)
        .style('text-anchor', d => d.children ? 'end' : 'start')
        .text(d => d.data.name); //use name for the node label
        
}


