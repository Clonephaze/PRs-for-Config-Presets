<script>
function trackClick(event) {
  // Filter out accordion style UI elements
  if (event.target.classList.contains('accordion')) return;

  // Filter out elements with IDs following the pattern "component-xxxx"
  let idPattern = /^component-\d{1,4}$/;
  if (event.target.id.match(idPattern)) return;

  // Send data to Python script via Gradio
  gr.interface.openFile(
    '/scripts/config_presets.py',
    { data: event.target.tagName + ' - ' + event.target.id }
  );
}

document.addEventListener('click', trackClick);
</script>
