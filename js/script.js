
  document.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('keydown', (e) => {
    if (
      e.ctrlKey && 
      (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S' || e.key === 'i' || e.key === 'I')
    ) {
      e.preventDefault();
    }
  });

