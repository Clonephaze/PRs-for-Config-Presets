document.addEventListener('DOMContentLoaded', function() {
  // Define a variable to store the hierarchical structure
  let hierarchicalData = {};

  document.getElementById('script_config_preset_open_custom_tracked_components_config').addEventListener('click', function() {
      document.addEventListener('click', function(event) {
          let element = event.target;

          // Check if the element ID matches the pattern
          if (!element.id.match(/^component-\d{1,4}$/) &&
              !element.classList.contains('gradio-accordion') &&
              !element.classList.contains('gradio-tabs') &&
              !element.classList.contains('gradio-tabitem') &&
              !element.classList.contains('svelte-19hvt5v')) {

              let elementID = element.id;
              let elementType = element.nodeName;

              // Create a hierarchy based on parent-child relationships
              let parent = element.parentElement;
              let hierarchy = [];
              while (parent && parent !== document.body) {
                  hierarchy.unshift(parent.id);
                  parent = parent.parentElement;
              }

              // Add the element to the hierarchicalData
              let currentLevel = hierarchicalData;
              hierarchy.forEach(level => {
                  if (!currentLevel[level]) {
                      currentLevel[level] = {};
                  }
                  currentLevel = currentLevel[level];
              });
              currentLevel[element.id] = { type: elementType };

              fetch('/track_click', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      hierarchicalData
                  })
              });
          }
      });
  });
});